import { helper } from '@ember/component/helper';

export function not(params) {
  return [...params].every((prop) => !prop);
}

export default helper(not);
