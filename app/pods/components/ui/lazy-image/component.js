import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { defaultProp } from 'greghogan-uk-2020/utils/props';

export default class LazyImage extends Component {
  @tracked forceCurrentlyVisible = false;
  @tracked hasLoaded = false;
  @tracked hasPlaceholder = false;
  @tracked hasErroredPlaceholder = false;
  @tracked offsetSrc = '';
  @tracked offsetSrcSet = '';
  @tracked offsetSizes = '100w';
  @tracked offsetPlaceholderSrc = '';

  constructor(owner, args) {
    super(owner, args);

    this.createSrcStrings();
  }

  get isCurrentlyOnScreen() {
    return defaultProp(this.args.isCurrentlyVisible, true);
  }

  get noBorder() {
    return defaultProp(this.args.hasBorder, false);
  }

  get mainAlt() {
    return defaultProp(this.args.alt, '');
  }

  get mainRole() {
    return defaultProp(this.args.role, 'img');
  }

  createSrcStrings() {
    const srcSet = this.args.srcSet || {};
    const srcMainObj = Object.fromEntries(Object.entries(srcSet).filter((src) => src[0] !== 'pl'));

    const placeholderSrc = srcSet?.pl?.src || '';
    const mainSrc = srcSet?.md?.src || srcMainObj[0]?.src || '';
    const mainSrcSet = this.stringifySrc(srcMainObj);
    const mainSizes = `${this.args.sizes} 100w`.replace(/^, /g, '').replace(/, 100w, 100w$/g, ', 100w');

    this.hasPlaceholder = !!placeholderSrc;
    this.placeholderSrc = placeholderSrc;
    this.offsetSrc = mainSrc;
    this.offsetSrcSet = mainSrcSet;
    this.offsetSizes = mainSizes;
  }

  stringifySrc(srcObject = {}) {
    return Object.values(srcObject).map((sizeObject) => (
      Object.values(sizeObject).filter(Boolean).join(' ').trim()
    )).join(', ').trim();
  }

  checkPlaceholderExists() {
    if (!this.hasPlaceholder) {
      this.setForceCurrentlyVisible();
    }
  }

  setForceCurrentlyVisible() {
    this.forceCurrentlyVisible = true;
  }

  @action
  setStateHasLoaded() {
    this.hasLoaded = true;
  }

  @action
  setPlaceholderError() {
    this.hasErroredPlaceholder = true;
    this.hasPlaceholder = false;

    this.setForceCurrentlyVisible();
  }
}
