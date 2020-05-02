import {
  isAnimating,
} from 'liquid-fire';


// Custom transition funcs
export function findFadingElement(context) {
  for (let i = 0; i < context.older.length; i++) {
    let entry = context.older[i];

    if (isAnimating(entry.element, 'fade-out')) {
      return entry.element;
    }
  }

  if (isAnimating(context.oldElement, 'fade-out')) {
    return context.oldElement;
  }
}

export function setDocumentHeight(heightValue) {
  const newHeight = heightValue && typeof heightValue === 'number' ? `${heightValue}px` : '';

  document.querySelector('html').style.overflow = 'hidden';
  document.querySelector('html').style.minHeight = newHeight;
}

export function resetDocumentHeight() {
  document.querySelector('html').style.overflow = '';
  document.querySelector('html').style.minHeight = '';
}


// Transition list

// Global const that can be toggled to stop scrolling issues
// when using the native back button.
window.defaultTransitionDuration = 550;
window.currentTransitionDuration = window.defaultTransitionDuration

export default function() {
  this.transition(
    this.use('toProject'),
  );

  this.transition(
    this.toRoute('home'),
    this.use('toHome'),
  );

  this.transition(
    this.toRoute('project'),
    this.use('toProject'),
  );
}
