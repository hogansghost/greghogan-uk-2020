import { helper } from '@ember/component/helper';

export function logger(hash) {
  console.log(hash); //eslint-disable-line no-console
}

export default helper(logger);
