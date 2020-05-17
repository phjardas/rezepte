import { useEffect } from 'react';
import NoSleep from './nosleep';

export function useWakeLock() {
  useEffect(() => {
    function acquireWakeLock() {
      return navigator.wakeLock
        .request('screen')
        .then((wakeLog) => {
          console.log('[wakelock] Wake log is active.');
          wakeLog.addEventListener('release', () => {
            console.log('[wakelock] Wake log was released.');
          });
        })
        .catch((error) => {
          console.warn('[wakelock] Failed to acquire wake lock: %s', error.message);
        });
    }

    if ('wakeLock' in navigator && typeof navigator.wakeLock.request === 'function') {
      console.log('[wakelock] Requesting wake lock via Wake Lock API');
      acquireWakeLock();
      document.addEventListener('visibilitychange', (evt) => {
        if (evt.target.visibilityState === 'visible') {
          console.log('[wakelock] Page re-gained focus, re-enabling wake lock.');
          acquireWakeLock();
        }
      });
      return;
    }

    console.log('[wakelock] Wake Lock API not available or failed, falling back to nosleep.js');

    const nosleep = new NoSleep('rescueTABLET')
      .on('enabled', () => {
        console.log('[wakelock] nosleep.js enabled');
      })
      .on('error', (error) => {
        console.warn('[wakelock] nosleep.js failed:', error);
      });

    const events = ['click', 'touch'];

    function enableNoSleep() {
      if (!nosleep.isEnabled) {
        console.log('[wakelock] Activating nosleep.js');
        nosleep.enable();
      }

      events.forEach((event) => document.removeEventListener(event, enableNoSleep, false));
    }

    events.forEach((event) => document.addEventListener(event, enableNoSleep, false));
  }, []);
}
