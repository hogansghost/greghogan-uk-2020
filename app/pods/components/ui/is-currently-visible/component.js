import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiIsCurrentlyVisible extends Component {
  @tracked isCurrentlyVisible = false;
  @tracked intersectionObserver = null;
  @tracked once = true;

  get triggerOnce() {
    const once = this.args.once;

    return [null, undefined].includes(once) ? once : true;
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