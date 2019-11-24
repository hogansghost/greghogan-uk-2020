import { helper } from '@ember/component/helper';

export function doesEqual(params, hash) {
  let match = false;
  let mode = hash.or || false;

  let check = (hash.strict == 0) ? (a, b) => a == b : (a, b) => a === b;

  if (hash.truthy) {
    /* TODO break into separate helper */
    check = (a, b) => !!a === !!b;
  }

  for (let i = 1; i < params.length; i++) {
    if (check(params[0], params[i])) {
      match = true;
    } else if (!mode) {
      return false;
    }
  }

  return match;
}

export default helper(doesEqual);
