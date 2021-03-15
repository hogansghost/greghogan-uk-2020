import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { next, throttle } from '@ember/runloop';

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
  @tracked stateFixed = false;
  @tracked stateEnd = false;
  @tracked hasEnteredView = false;
  @tracked headerElement;
  @tracked isSticky = false;
  @tracked isFixed = false;

  constructor(args, owner) {
    super(args, owner);
    ;
    this.resetPosition();
  }

  get elementIsSticky() {
    return this.isSticky;
  }

  get elementIsFixed() {
    return this.isFixed;
  }

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

  _checkIfStickySupported(element) {
    this.isSticky = !(element && window.getComputedStyle(element, null).getPropertyValue('position') === 'relative');

    return this.isSticky;
  }

  repositionStaticElement(element) {
    next(() => {
      const staticElement = element;
      const isCurrentlyVisible = true; // this.args.isCurrentlyVisible || false;
      const isHeadingMeantToBeSticky = this._checkIfStickySupported(this.headerElement);

      /*
      * Check for the static element and whether the CSS is setting it to static,
      * as anything other than static means it is meant to scroll with the client. While
      * this could check the window width, it's much easier to sync to the CSS as the media
      * width may change.
      */
      if (isCurrentlyVisible && staticElement && isHeadingMeantToBeSticky) {
        const windowInnerHeight = window.innerHeight;
        const staticElementPosition = staticElement.getBoundingClientRect();
        const staticElementPositionTop = staticElementPosition.top;
        const staticElementPositionBottom = staticElementPosition.bottom;

        if (staticElementPositionTop <= windowInnerHeight) {
          this.setFirstEntryAndCallEntryMethod();
        }

        if (staticElementPositionTop <= windowInnerHeight && staticElementPositionBottom >= 0 ) {
          if (staticElementPositionTop > 0 ) {
            this.isFixed = false;
            this.stateEnd = false;
            this.hasEnteredView = false;
          } else if (staticElementPositionTop <= 0 && staticElementPositionBottom - windowInnerHeight > 0 ) {
            this.isFixed = true;
            this.stateEnd = false;
            this.hasEnteredView = true;
          } else if (staticElementPositionBottom - windowInnerHeight <= 0 && staticElementPositionTop <= 0 ) {
            this.isFixed = false;
            this.stateEnd = true;
            this.hasEnteredView = false;
          } else {
            this.stateEnd = false;
          }
        }
      } else if (!isHeadingMeantToBeSticky) {
        this.isSticky = isHeadingMeantToBeSticky;
      }
    });
  }

  _resetPosition() {
    this.stateFixed = false;
    this.stateEnd = false;
    this.isFixed = false;
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

  throttledRepositionStaticElement(element) {
    throttle(this, this.repositionStaticElement.bind(this, element), 1);
  }

  @action
  attachListeners(element) {
    this._onScroll = this.throttledRepositionStaticElement.bind(this, element);

    window.addEventListener('scroll', this._onScroll, false);
    window.addEventListener('resize', this._onScroll, false);
  }

  @action
  checkIfStickySupported(element) {
    return this._checkIfStickySupported(element);
  }

  @action
  detachListeners() {
    window.removeEventListener('scroll', this._onScroll, false);
    window.removeEventListener('resize', this._onScroll, false);
  }

  @action
  resetPosition() {
    this._resetPosition();
  }

  @action
  setHeaderElement(element) {
    this.headerElement = element;
  }
}
