export function defaultProp(prop, fallback = false) {
  return ![null, undefined].includes(prop) ? prop : fallback;
}

export default defaultProp;
