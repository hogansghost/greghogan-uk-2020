import { registerDeprecationHandler } from '@ember/debug';

export function initialize() {
  registerDeprecationHandler((message, options, next) => {
    if (message.indexOf('Using Ember.$() has been deprecated') >= 0) {
      return;
    } else {
      next(message, options);
    }
  });
}

export default { initialize };
