import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import { DarkModeStates } from '../../../../services/dark-mode';

export default class DarkModeToggle extends Component {
  @service darkMode;

  @action
  darkModeCycle() {
    if ([DarkModeStates.Auto, DarkModeStates.AutoOff, DarkModeStates.AutoOn].includes(this.darkMode.darkMode)) {
      this.darkMode.manualDarkModeOn();
    } else if (this.darkMode.darkMode === DarkModeStates.On) {
      this.darkMode.manualDarkModeOff();
    } else if (this.darkMode.darkMode === DarkModeStates.Off) {
      this.darkMode.manualDarkModeRevoke();
    }
  }
}
