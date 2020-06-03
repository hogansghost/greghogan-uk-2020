import Service from '@ember/service';
import { get, set } from '@ember/object';
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
  isDark: DarkModeStates.Auto,
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
        console.error(safariErr); //eslint-disable-line no-console
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
      set(this, 'isDark', windowPreference);
    }

    this.toggleBodyClassForDarkMode(get(this, 'darkMode'));
  },

  setDarkModeState(state) {
    set(this, 'isDark', state);
  },

  toggleBodyClassForDarkMode(darkMode) {
    if ([DarkModeStates.On, DarkModeStates.AutoOn].includes(darkMode)) {
      this.setDarkModeState(darkMode);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if ([DarkModeStates.Off, DarkModeStates.AutoOff].includes(darkMode)) {
      this.setDarkModeState(darkMode);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  },

  manualDarkModeOn() {
    set(this, 'isDark', DarkModeStates.On);

    window?.localStorage?.setItem('darkMode', DarkModeStates.On);

    this.applyDarkMode();
  },
  
  manualDarkModeOff() {
    set(this, 'isDark', DarkModeStates.Off);

    window?.localStorage?.setItem('darkMode', DarkModeStates.Off);

    this.applyDarkMode();
  },
  
  manualDarkModeRevoke() {
    set(this, 'isDark', DarkModeStates.Auto);

    window?.localStorage?.removeItem('darkMode');

    this.applyDarkMode();
  },
});
