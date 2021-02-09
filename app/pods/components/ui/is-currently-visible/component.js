import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { defaultProp } from 'greghogan-uk-2020/utils/props';

export default class UiIsCurrentlyVisible extends Component {
  @tracked isCurrentlyVisible = false;
  @tracked intersectionObserver = null;

  get triggerOnce() {
    return defaultProp(this.args.once, true);
  }

  @action
  bindScrollEvents(element) {
    if ('IntersectionObserver' in window) {
      const once = this.once;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this.isCurrentlyVisible = true;

            if (once) {
              this.unbindScrollEvents(element);
            }
          }
        });
      }, {
        threshold: 0.1
      });

      this.intersectionObserver = observer;

      this.intersectionObserver.observe(element);
    } else {
      this.isCurrentlyVisible = true;
    }
  }

  @action
  unbindScrollEvents(element) {
    this.intersectionObserver.unobserve(element);
  }
}
