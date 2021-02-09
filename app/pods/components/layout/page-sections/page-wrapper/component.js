import Component from '@glimmer/component';

import { defaultProp } from 'greghogan-uk-2020/utils/props';

export default class LayoutPageWrapper extends Component {
  get spacingUpper() {
    return defaultProp(this.args.spacingUpper, false);
  }

  get spacingLower() {
    return defaultProp(this.args.spacingLower, false);
  }
}
