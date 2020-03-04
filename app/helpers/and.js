import { helper } from '@ember/component/helper';

export function and(params, hash) {
  let currentStatus = true;

  for (let i = 1; i < params.length; i++) {
    if (!params[i]) {
      currentStatus = false;
    }
  }

  return currentStatus;
}

export default helper(and);
