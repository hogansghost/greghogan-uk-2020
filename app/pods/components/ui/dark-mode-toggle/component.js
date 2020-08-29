import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import { DarkModeStates } from '../../../../services/dark-mode';

export default class DarkModeToggle extends Component {
  @service darkMode;

  get darkModeState() {
    return this.darkMode.isDark;
  }

  get statusTitle() {
    const isDark = this.darkMode.isDark;

    let status = 'Auto';

    if (isDark === DarkModeStates.On) {
      status = 'Dark';
    } else if (isDark === DarkModeStates.Off) {
      status = 'Light';
    }

    return status;
  }

  @action
  darkModeCycle() {
    const isDark = this.darkMode.isDark;

    if ([DarkModeStates.Auto, DarkModeStates.AutoOff, DarkModeStates.AutoOn].includes(isDark)) {
      this.darkMode.manualDarkModeOn();
    } else if (isDark === DarkModeStates.On) {
      this.darkMode.manualDarkModeOff();
    } else if (isDark === DarkModeStates.Off) {
      this.darkMode.manualDarkModeRevoke();
    }
  }
}
