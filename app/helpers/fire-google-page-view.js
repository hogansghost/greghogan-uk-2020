import { helper } from '@ember/component/helper';

export const fireGooglePageView = () => (pageName = '') => (
  console.log(pageName)
)

export default helper(fireGooglePageView);
