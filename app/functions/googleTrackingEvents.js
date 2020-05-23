export function fireGoogleEvent(message = '') {
  if (window?.ga) {
    window.ga('send', 'event', 'Page Section', message);
  }
}
