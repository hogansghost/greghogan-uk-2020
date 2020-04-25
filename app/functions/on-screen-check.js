export function onScreenCheck(element, offsetAmount = 0.9) {
  const windowHeight  = window && window.innerHeight || 0;

  if (offsetAmount > 1 || offsetAmount < 0) {
    console.warn('W A R N :: Offset must be between 0 and 1');
    offsetAmount = 0;
  }

  const componentElement = element;

  let onscreenCurrently = false;

  if (componentElement) {
    const componentElementHeight = componentElement.offsetHeight;
    const componentElementRect = componentElement && componentElement.getBoundingClientRect();
    const componentElementRectTop = componentElementRect.top;
    const componentElementFullOffset = componentElementRectTop + componentElementHeight;

    const isElementOnScreen = componentElementRectTop - (windowHeight * offsetAmount) <= 0 && componentElementFullOffset >= 0;

    if (isElementOnScreen) {
      onscreenCurrently = true;
    } else if (!isElementOnScreen && onscreenCurrently) {
      onscreenCurrently = false;
    } else {
      onscreenCurrently = false;
    }
  } else {
    console.warn('W A R N :: Element not found');
  }

  return onscreenCurrently;
};
