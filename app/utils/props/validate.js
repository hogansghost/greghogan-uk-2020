export function validateProp(prop, propList, fallback = false) {
  if (!propList) {
    console.warn('No prop list object passed');
    return prop;
  }

  let propValue = prop;

  if (!fallback) {
    fallback = propList[Object.keys(propList)[0]];
  } else {
    fallback = validateProp(fallback, propList);
  }

  const propIsValid = ![null, undefined].includes(propValue) ? Object.values(propList).includes(propValue) : true;

  if (!propValue || !propIsValid) {
    propValue = fallback;
  }

  if (!propIsValid) {
    console.warn(`Invald prop passed: ${prop}. Available options are: ${Object.values(propList)}`); // eslint-disable-line no-console
  }

  return propValue;
}

export default validateProp;
