
import { PUBG_VN_SQUADS } from '../data/pubgVnSquads';

export function fetchKraftonPubgTelemetry(
  squadId,
  { signal } = {},
) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'));
      return;
    }

    const delay = 1200 + Math.random() * 1000;

    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);

      // Simulate 35% satellite packet loss.
      if (Math.random() < 0.35) {
        reject(
          new Error(
            'Satellite packet loss: connection timed out.',
          ),
        );
        return;
      }

      const squad = PUBG_VN_SQUADS.find(
        (item) => item.id === squadId,
      );

      if (!squad) {
        reject(new Error('The selected squad was not found.'));
        return;
      }

      resolve({ ...squad });
    }, delay);

    function handleAbort() {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener('abort', handleAbort);

      reject(
        new DOMException('Request aborted', 'AbortError'),
      );
    }

    signal?.addEventListener('abort', handleAbort, {
      once: true,
    });
  });
}
