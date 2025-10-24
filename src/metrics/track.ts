import { metrics } from './metrics';
export function track(name: string, data?: Record<string, unknown>) {
  metrics.click(name, data);
}
