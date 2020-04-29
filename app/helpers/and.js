import { helper } from '@ember/component/helper';

export function and(params) {
  return [...params].every((prop) => !!prop);
}

export default helper(and);
