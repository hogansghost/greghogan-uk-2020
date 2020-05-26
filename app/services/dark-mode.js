import Service from '@ember/service';
import { computed, get, set } from '@ember/object';

export default Service.extend({
  darkMode: false,
  forceDarkMode: false,

  init() {
    this._super(...arguments);

    this.attachListeners();
    this.applyDarkMode();
  },

  attachListeners() {
    this._applyDarkMode = this.applyDarkMode.bind(this);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this._applyDarkMode);
  },

  detachListeners() {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this._applyDarkMode);
  },

  applyDarkMode() {
    const windowPreference = window?.matchMedia('(prefers-color-scheme: dark)').matches;
    const forceDarkMode = get(this, 'forceDarkMode');

    this.toggleBodyClassForDarkMode(windowPreference && forceDarkMode);
  },

  setDarkModeState(state) {
    set(this, 'darkMode', state);
  },

  toggleBodyClassForDarkMode(darkMode) {
    if (darkMode) {
      this.setDarkModeState(darkMode);
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      this.setDarkModeState(darkMode);
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  },

  manualDarkModeOn() {
    set(this, 'forceDarkMode', true);
  },
  
  manualDarkModeOff() {
    set(this, 'forceDarkMode', false);
  },
});
