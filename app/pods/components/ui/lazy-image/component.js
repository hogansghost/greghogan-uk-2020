import Component from '@ember/component';
import { get, observer, set } from '@ember/object';
import { alias } from '@ember/object/computed';


export default Component.extend({
  classNames: 'lazy-image',
  
  srcSet: null,
  sizes: null,
  isCurrentlyVisible: false,

  placeholderSrc: alias('srcSet.pl.src'),

  hasLoaded: false,
  hasPlaceholder: false,
  hasErroredPlaceholder: false,
  srcSetStringified: '',
  offsetSrc: '',
  offsetSrcSet: '',
  offsetSizes: '100w',
  offsetPlaceholderSrc: '',

  init() {
    this._super();

    this._setPlaceholderError = () => this.setPlaceholderError();
    this._setStateHasLoaded = () => this.setStateHasLoaded();

    this.setOffsetSrc();
    this.setStringifySrcSet();
    this.setOffsetPlaceholderSrc();
  },
  
  didInsertElement() {
    this._super();
    
    this.bindEvents();
    this.setStateHasPlaceholder();
  },
  
  willDestroyElement() {
    this.unbindEvents();
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
      lazyImagePlaceholder.removeEventListener('error', this._setPlaceholderError);
    }
  },
  
  setOffsetSrc() {
    const srcObject = get(this, 'srcSet') || {}; //where is this being set?
    const srcMd = Object.entries(srcObject).find((arr) => arr[0] === 'md'); //? prop names?
    
    set(this, 'offsetSrc', (srcMd && srcMd[1] && srcMd[1].src || ''));
  },
  
  setOffsetPlaceholderSrc() {
    if (get(this, 'srcSet.pl.src')) { // if you already have it here, is there code above needed?
    }
      const srcObject = get(this, 'srcSet') || {};
      const srcPl = Object.entries(srcObject).find((arr) => arr[0] === 'pl');
      
      set(this, 'offsetPlaceholderSrc', (srcPl && srcPl[1] && srcPl[1].src || ''));
  },

  setStringifySrcSet() {
    const srcObject = get(this, 'srcSet') || {};
    const srcString = Object.keys(srcObject).filter((keyName) => keyName !== 'pl').map((imageSrc) => (
      Object.values(srcObject[imageSrc]).filter(Boolean).join(' ')
    )).join(', ').trim();

    set(this, 'srcSetStringified', srcString);
  },

  setStateHasLoaded() {
    set(this, 'hasLoaded', true);

    this.unbindEvents();
  },

  setPlaceholderError() {
    set(this, 'hasErroredPlaceholder', true);
    set(this, 'hasPlaceholder', false);
  },

  setStateHasPlaceholder() { // missleading name?
    if (get(this, 'isCurrentlyVisible')) {
      this.setOffsetSrcSet();
      set(this, 'sizes', `${get(this, 'sizes')}, 100w`.replace(/^, /g, ''));
    }

    if (get(this, 'srcSet.pl')) {
      set(this, 'hasPlaceholder', true);
    }
  },

  setOffsetSrcSet() {
    if (get(this, 'isCurrentlyVisible')) { // do need to check here
      set(this, 'offsetSrcSet', get(this, 'srcSetStringified')); //to simplify, can get rid of this var and do whatever setStringifySrcSet does in this func
      set(this, 'offsetSizes', `${get(this, 'sizes')}, 100w`.replace(/^, /g, ''));
    }
  },

  isCurrentlyVisibleObserver: observer('isCurrentlyVisible', function() {
    debugger;
    if (get(this, 'isCurrentlyVisible')) { // wouldn't you do it alredy in init?
      this.setOffsetSrcSet();
    }
  }),
});
