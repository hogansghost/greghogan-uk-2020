import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { validateProp } from 'greghogan-uk-2020/utils/props';

const TitlePositions = {
  LEFT: 'left',
  RIGHT: 'right',
};

const Theme = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

export default class LayoutPageSectionStickyHeader extends Component {
  @tracked isFirstEntry = false;
  @tracked hasEnteredView = false;

  get currentTitlePosition() {
    return this.args.titlePosition || TitlePositions.RIGHT;
  }

  get isTitleFirst() {
    return this.currentTitlePosition === TitlePositions.LEFT;
  }

  get bemTitleTheme() {
    const titleTheme = validateProp(this.args.titleTheme, Theme, Theme.PRIMARY);

    return `theme-${titleTheme}`;
  }

  setFirstEntryAndCallEntryMethod() {
    const isValidFirstEntry = !this.isFirstEntry && this.hasEnteredView;

    if (isValidFirstEntry && typeof this.args.onEntryToViewport === 'function') {
      this.args.onEntryToViewport();
    }

    if (isValidFirstEntry && !this.stateEnd) {
      this.isFirstEntry = true;
    }
  }
}
