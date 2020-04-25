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

export function bem(baseClass = '', modifierList = {}) {
  // console.warn('F I X :: Bem util, tidy up and make the string utils file'); //eslint-disable-line no-console
  const modifierClasses = Object.entries(modifierList).map((bemEntry) => {
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
  }).filter(Boolean).join(' ');

  return `${baseClass} ${modifierClasses}`.trim();
}

export default helper(bem);
