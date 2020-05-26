import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { not } from '@ember/object/computed';


export default Component.extend({
  classNames: 'lazy-image',
  classNameBindings: ['shouldImageCover:lazy-image--image-cover:lazy-image--image-default'],
  
  alt: '',
  caption: '',
  hasBorder: true,
  role: '',
  srcSet: null,
  sizes: '',
  isCurrentlyVisible: true,
  shouldImageCover: false,
  
  noBorder: not('hasBorder'),
  forceCurrentlyVisible: false,
  hasLoaded: false,
  hasPlaceholder: false,
  hasErroredPlaceholder: false,
  offsetSrc: '',
  offsetSrcSet: '',
  offsetSizes: '100w',
  offsetPlaceholderSrc: '',

  mainRole: computed('role', 'alt', function() {
    const alt = `${get(this, 'alt')}`;
    const role = `${get(this, 'role')}`;

    let roleValue = 'img';

    if (role) {
      roleValue = role;
    } else if (alt) {
      roleValue = alt;
    }

    return roleValue;
  }),

  init() {
    this._super();

    this.createInstanceEventHandlers();
    this.createSrcStrings();
  },
  
  didInsertElement() {
    this._super();
    
    this.bindEvents();
    this.checkPlaceholderExists();
  },
  
  willDestroyElement() {
    this.unbindEvents();
  },

  createInstanceEventHandlers() {
    this._setPlaceholderError = () => this.setPlaceholderError();
    this._setStateHasLoaded = () => this.setStateHasLoaded();
  },
  
  bindEvents() {
    const lazyImageMain = this.element.querySelector('.js__lazy-main');
    const lazyImagePlaceholder = this.element.querySelector('.js__lazy-placeholder');
    
    if (lazyImageMain) {
      lazyImageMain.addEventListener('load', this._setStateHasLoaded);
    }
    
    if (lazyImagePlaceholder) {
      lazyImagePlaceholder.addEventListener('error', this._setPlaceholderError);
    }
  },
  
  unbindEvents() {
    const lazyImageMain = this.element.querySelector('.js__lazy-main');
    const lazyImagePlaceholder = this.element.querySelector('.js__lazy-placeholder');
    
    if (lazyImageMain) {
      lazyImageMain.removeEventListener('load', this._setStateHasLoaded);
    }
    
    if (lazyImagePlaceholder) {
      lazyImagePlaceholder.removeEventListener('error', this.setPlaceholderError);
    }
  },

  createSrcStrings() {
    const srcSet = get(this, 'srcSet') || {};
    const srcMainObj = Object.fromEntries(Object.entries(srcSet).filter((src) => src[0] !== 'pl'));

    const placeholderSrc = srcSet?.pl?.src || '';
    const mainSrc = srcSet?.md?.src || srcMainObj[0]?.src || '';
    const mainSrcSet = this.stringifySrc(srcMainObj);
    const mainSizes = `${get(this, 'sizes')}, 100w`.replace(/^, /g, '').replace(/, 100w, 100w$/g, ', 100w');

    set(this, 'placeholderSrc', placeholderSrc);
    set(this, 'offsetSrc', mainSrc);
    set(this, 'offsetSrcSet', mainSrcSet);
    set(this, 'offsetSizes', mainSizes);

    set(this, 'hasPlaceholder', !!placeholderSrc);
  },

  stringifySrc(srcObject = {}) {
    return Object.values(srcObject).map((sizeObject) => (
      Object.values(sizeObject).filter(Boolean).join(' ').trim()
    )).join(', ').trim();
  },

  checkPlaceholderExists() {
    if (!get(this, 'hasPlaceholder')) {
      this.setForceCurrentlyVisible();
    }
  },
  
  setForceCurrentlyVisible() {
    if (this._state === 'inDOM') {
      set(this, 'forceCurrentlyVisible', true);
    }
  },
  
  setStateHasLoaded() {
    if (this._state === 'inDOM') {
      set(this, 'hasLoaded', true);
    }
    
    this.unbindEvents();
  },
  
  setPlaceholderError() {
    if (this._state === 'inDOM') {
      set(this, 'hasErroredPlaceholder', true);
      set(this, 'hasPlaceholder', false);

      this.setForceCurrentlyVisible();
    }
  },
});
