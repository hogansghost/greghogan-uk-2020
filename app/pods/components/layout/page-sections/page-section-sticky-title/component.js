import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { throttle } from '@ember/runloop';

const titlePositions = {
  Left: 'left',
  Right: 'right',
};

export default class LayoutPageSectionStickyHeader extends Component {
  @tracked analyticsLogName = null;
  @tracked isCurrentlyVisible = false;
  @tracked isFirstEntry = false;
  @tracked stateFixed = false;
  @tracked stateEnd = false;
  @tracked title = '';
  @tracked onEntryToViewport = () => {};
  @tracked titlePosition = 'right';
  @tracked titleTheme = 'primary';
  @tracked hasEnteredView = false;

  @tracked headerElement;
  @tracked isSticky = false;
  @tracked isFixed = false;

  get elementIsSticky() {
    return this.isSticky;
  }

  get elementIsFixed() {
    return this.isFixed;
  }

  get currentTitlePosition() {
    return this.args.titlePosition || titlePositions.Right;
  }

  get isTitleFirst() {
    return this.currentTitlePosition === titlePositions.Left;
  }

  get bemTitleTheme() {
    const titleTheme = this.args.titleTheme || 'primary';

    return `theme-${titleTheme}`;
  }

  @action
  attachListeners(element) {
    this._onScroll = this.throttledRepositionStaticElement.bind(this, element);

    window.addEventListener('scroll', this._onScroll, false);
    window.addEventListener('resize', this._onScroll, false);
  }

  @action
  detachListeners() {
    window.removeEventListener('scroll', this._onScroll, false);
    window.removeEventListener('resize', this._onScroll, false);
  }

  throttledRepositionStaticElement(element) {
    throttle(this, this._repositionStaticElement.bind(this, element), 1);
  }

  @action
  checkIfStickySupported(element) {
    return this._checkIfStickySupported(this.headerElement);
  }

  @action
  setHeaderElement(element) {
    this.headerElement = element;
  }

  _checkIfStickySupported(element) {
    this.isSticky = !(element && window.getComputedStyle(element, null).getPropertyValue('position') === 'relative');
    return this.isSticky;
  }

  // @action
  // repositionStaticElement(element) {
  //   this._repositionStaticElement(element);
  // }

  _repositionStaticElement(element) {
    const staticElement = element;
    const isCurrentlyVisible = this.args.isCurrentlyVisible || false;
    const isHeadingMeantToBeSticky = this._checkIfStickySupported(this.headerElement);
    /**
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

      this.isSticky = true;

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
  }

  setFirstEntryAndCallEntryMethod() {
    if (!this.isFirstEntry && !this.stateEnd && this.hasEnteredView) {
      this.isFirstEntry = true;

      this.onEntryToViewport();
    }
  }

  @action
  resetPosition() {
    this._resetPosition();
  }

  _resetPosition() {
    this.stateFixed = false;
    this.stateEnd = false;
  }
}
