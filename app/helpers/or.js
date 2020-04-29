import { helper } from '@ember/component/helper';

export function or(params, hash) {
  return [...params].some((prop) => !!prop);
}

export default helper(or);
