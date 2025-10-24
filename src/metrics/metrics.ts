// Logger que imprime em SEGUNDOS no console do navegador
// e envia para o Vite (/_metrics) para aparecer no terminal.

type Data = Record<string, unknown> | undefined;

function postToDevServer(evt: any) {
  try {
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(evt)], { type: 'application/json' });
      navigator.sendBeacon('/_metrics', blob);
    } else {
      fetch('/_metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evt),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {}
}

const fmtS = (ms: number) => (ms / 1000).toFixed(3); // ms -> "x.xxx" segundos

class ConsoleMetrics {
  private t0: Record<string, number> = {};

  now() { return performance.now(); }

  mark(name: string, data?: Data) {
    const at = this.now();
    console.log('[metrics] mark', name, { at_s: fmtS(at), ...data });
    postToDevServer({ type: 'mark', name, at, at_s: Number(fmtS(at)), data });
  }

  start(name: string) {
    const at = (this.t0[name] = this.now());
    console.log('[metrics] start', name, { at_s: fmtS(at) });
    postToDevServer({ type: 'start', name, at, at_s: Number(fmtS(at)) });
  }

  end(name: string, data?: Data) {
    const t0 = this.t0[name];
    if (t0 == null) return;
    const at = this.now();
    const ms = at - t0;
    const s = Number(fmtS(ms));
    console.log('[metrics] end', name, { s, ...data });
    postToDevServer({ type: 'end', name, at, ms, s, data });
    delete this.t0[name];
    return ms;
  }

  click(name: string, data?: Data) {
    const at = this.now();
    console.log('[metrics] click', name, { at_s: fmtS(at), ...data });
    postToDevServer({ type: 'click', name, at, at_s: Number(fmtS(at)), data });
  }
}

export const metrics = new ConsoleMetrics();

export function avg(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}
