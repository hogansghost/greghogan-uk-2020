export function fireGoogleEvent(message = '') {
  if (window?.gtag) {
    window.gtag('send', 'event', 'Page Section', `Viewed - ${message}`);
  }
}
