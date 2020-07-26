import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LazyImage extends Component {
  @tracked alt = '';
  @tracked caption = '';
  @tracked hasBorder = true;
  @tracked role = '';
  @tracked srcSet = null;
  @tracked sizes = '';
  @tracked isCurrentlyVisible = true;
  @tracked shouldImageCover = false;

  @tracked forceCurrentlyVisible = false;
  @tracked hasLoaded = false;
  @tracked hasPlaceholder = false;
  @tracked hasErroredPlaceholder = false;
  @tracked offsetSrc = '';
  @tracked offsetSrcSet = '';
  @tracked offsetSizes = '100w';
  @tracked offsetPlaceholderSrc = '';

  get noBorder() {
    return !this.args.hasBorder;
  }

  get mainAlt() {
    const alt = `${this.args.alt}`;

    let altValue = '';

    if (alt) {
      altValue = alt;
    }

    return altValue;
  }

  get mainRole() {
    const alt = `${this.args.alt}`;
    const role = `${this.args.role}`;

    let roleValue = 'img';

    if (role) {
      roleValue = role;
    } else if (alt) {
      roleValue = alt;
    }

    return roleValue;
  }

  constructor(owner, args) {
    super(owner, args);

    this.createSrcStrings();
  }

  createSrcStrings() {
    const srcSet = this.args.srcSet || {};
    const srcMainObj = Object.fromEntries(Object.entries(srcSet).filter((src) => src[0] !== 'pl'));

    const placeholderSrc = srcSet?.pl?.src || '';
    const mainSrc = srcSet?.md?.src || srcMainObj[0]?.src || '';
    const mainSrcSet = this.stringifySrc(srcMainObj);
    const mainSizes = `${this.args.sizes} 100w`.replace(/^, /g, '').replace(/, 100w, 100w$/g, ', 100w');

    this.placeholderSrc = placeholderSrc;
    this.offsetSrc = mainSrc;
    this.offsetSrcSet = mainSrcSet;
    this.offsetSizes = mainSizes;

    this.hasPlaceholder = !!placeholderSrc;
  }

  stringifySrc(srcObject = {}) {
    return Object.values(srcObject).map((sizeObject) => (
      Object.values(sizeObject).filter(Boolean).join(' ').trim()
    )).join(', ').trim();
  }

  checkPlaceholderExists() {
    if (!this.args.hasPlaceholder) {
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
