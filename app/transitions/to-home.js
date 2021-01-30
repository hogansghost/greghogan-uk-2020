import {
  animate,
  finish,
  isAnimating,
  stop,
  timeSpent,
} from 'liquid-fire';

import {
  findFadingElement,
  setDocumentHeight,
  resetDocumentHeight,
} from '../transitions';

export default function toProject(opts = {}) {
  let firstStep;
  let outOpts = {
    ...opts,
    duration: window.currentTransitionDuration,
  };
  let fadingElement = findFadingElement(this);

  const currentPageElement = this.oldElement[0];
  const currentPageElementHeight = currentPageElement && currentPageElement.clientHeight || window.innerHeight;

  setDocumentHeight(currentPageElementHeight);

  if (fadingElement) {
    // We still have some older version that is in the process of
    // fading out, so out first step is waiting for it to finish.
    firstStep = finish(fadingElement, 'fade-out');
  } else {
    if (isAnimating(this.oldElement, 'fade-in')) {
      // if the previous view is partially faded in, scale its
      // fade-out duration appropriately.
      outOpts = {
        duration: timeSpent(this.oldElement, 'fade-in'),
      };
    }

    stop(this.oldElement);

    firstStep = animate(this.oldElement, {
      opacity: 0,
    }, outOpts, 'fade-out');
  }

  return firstStep.then(() => {
    const documentHeight = this.newElement[0]?.clientHeight || window.innerHeight;

    setDocumentHeight(documentHeight);

    window.scrollTo({
      top: window.previousScrollPosition || 0,
    });

    return animate(this.newElement, {
      opacity: [
        (opts.maxOpacity || 1),
        0,
      ]
    }, {
      ...opts,
      duration: window.currentTransitionDuration,
    }, 'fade-in').then(() => {
      // Reset transition duration in case native navigation buttons were used.
      window.currentTransitionDuration = window.defaultTransitionDuration || 550;

      resetDocumentHeight();
    });
  });
}
