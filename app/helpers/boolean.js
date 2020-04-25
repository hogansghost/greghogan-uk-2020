import { helper } from '@ember/component/helper';

export function boolean(input) {
  return !!input;
}

export default helper(boolean);
