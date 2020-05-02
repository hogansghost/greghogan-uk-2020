import { helper } from '@ember/component/helper';

export const hyphenCase = (...strings) => {
  const filteredParams = strings.filter((string) => typeof string === 'string' && string.trim() !== '').join(' ');

  // Replace anything not a letter, number or dash with a dash.
  // Replace lowerCase followed by upperCase and sequential upperCase followed by lowerCase with a dash.
  // Replace multiple sequential dashes and any trailing with nothing.
  return filteredParams
    .replace(/([^a-zA-Z0-9,^]+)|([a-z])([A-Z])|([A-Z])([A-Z][a-z])|(-{1,})/g, '$2$4-$3$5')
    .replace(/^[\s-]{1,}|[\s-]{1,}$/g, '')
    .toLowerCase();
};

export function bem(baseClass = '', modifierList) {
  let modifierClasses = [];

  if (baseClass.length >= 2) {
    let modifiers = baseClass.slice(1);
    
    modifiers.map((className) => {
      modifierClasses.push(`${baseClass[0]}--${hyphenCase(className)}`);
    });
  } else {
    modifierClasses = Object.entries(modifierList).map((bemEntry) => {
      const [
        bemKey,
        bemValue,
      ] = bemEntry;

      let classNameString = '';

      if (![true, false, undefined].includes(bemValue)) {
        classNameString = `${baseClass}--${hyphenCase(bemValue)}`;
      } else if (bemValue === true) {
        classNameString = `${baseClass}--${hyphenCase(bemKey)}`;
      }

      return classNameString;
    });
  }

  return `${baseClass[0]} ${modifierClasses.filter(Boolean).join(' ')}`.trim();
}

export default helper(bem);
