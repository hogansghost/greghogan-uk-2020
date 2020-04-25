import { helper } from '@ember/component/helper';

export function concat(...strings) {
  const stringsToConcat = [...strings];

  return stringsToConcat.filter(Boolean).join('').trim();
}

export default helper(concat);
