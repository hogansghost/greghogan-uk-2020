import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { bind } from '@ember/runloop';

const darkMediaQuery = 'screen and (prefers-color-scheme: dark)';

export const DarkModeStates = {
  Auto: 'auto',
  AutoOn: 'auto-on',
  AutoOff: 'auto-off',
  Off: 'off',
  On: 'on',
};

export default Service.extend({
  darkMode: DarkModeStates.Auto,
  safariMode: false,
  
  init() {
    this._super(...arguments);
    
    this._applyDarkMode = bind(this, this.applyDarkMode);
    
    this.attachListeners();
    this.applyDarkMode();
    this.setForcedDarkModeFromStorage();
  },
  
  attachListeners() {
    const mediaQuery = window.matchMedia(darkMediaQuery);
    
    try {
      mediaQuery.addEventListener('change', this._applyDarkMode);
    } catch (err) {
      try {
        // Safari
        mediaQuery.addListener(this._applyDarkMode);
        set(this, 'safariMode', true);
      } catch (safariErr) {
        console.error(safariErr);
      }
    }
  },
  
  detachListeners() {
    if (get(this, 'safariMode')) {
      window.matchMedia(darkMediaQuery).removeListener(this._applyDarkMode);
    } else {
      window.matchMedia(darkMediaQuery).removeEventListener('change', this._applyDarkMode);
    }
  },
  
  setForcedDarkModeFromStorage() {
    const storedPreference = window?.localStorage?.getItem('darkMode');

    if (storedPreference === DarkModeStates.On) {
      this.manualDarkModeOn();
    } else if (storedPreference === DarkModeStates.Off) {
      this.manualDarkModeOff();
    }
  },

  applyDarkMode() {
    const windowPreference = window?.matchMedia(darkMediaQuery).matches ? DarkModeStates.AutoOn : DarkModeStates.AutoOff;

    if ([DarkModeStates.Auto, DarkModeStates.AutoOff, DarkModeStates.AutoOn].includes(get(this, 'darkMode'))) {
      set(this, 'darkMode', windowPreference);
    }

    this.toggleBodyClassForDarkMode(get(this, 'darkMode'));
  },

  setDarkModeState(state) {
    set(this, 'darkMode', state);
  },

  toggleBodyClassForDarkMode(darkMode) {
    if ([DarkModeStates.On, DarkModeStates.AutoOn].includes(darkMode)) {
      this.setDarkModeState(darkMode);
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else if ([DarkModeStates.Off, DarkModeStates.AutoOff].includes(darkMode)) {
      this.setDarkModeState(darkMode);
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  },

  manualDarkModeOn() {
    set(this, 'darkMode', DarkModeStates.On);

    window?.localStorage?.setItem('darkMode', DarkModeStates.On);

    this.applyDarkMode();
  },
  
  manualDarkModeOff() {
    set(this, 'darkMode', DarkModeStates.Off);

    window?.localStorage?.setItem('darkMode', DarkModeStates.Off);

    this.applyDarkMode();
  },
  
  manualDarkModeRevoke() {
    set(this, 'darkMode', DarkModeStates.Auto);

    window?.localStorage?.removeItem('darkMode');

    this.applyDarkMode();
  },
});
