import { Component, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: any };

export default class DevErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: any, info: any) {
    // também loga no console do navegador/VS Code
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 16, fontFamily: 'ui-sans-serif, system-ui' }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Algo quebrou na renderização 😬
          </h1>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#111', color: '#0f0', padding: 12, borderRadius: 8 }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          <p>Abra o Console (F12) para detalhes.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
