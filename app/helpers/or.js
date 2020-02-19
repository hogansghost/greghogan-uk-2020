import { helper } from '@ember/component/helper';

export function or(params, hash) {
  for (let i = 1; i < params.length; i++) {
    if (!!params[i]) {
      return true;
    }
  }

  return false;
}

export default helper(or);
