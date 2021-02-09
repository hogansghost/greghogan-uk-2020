import Component from '@glimmer/component';

import { defaultProp } from 'greghogan-uk-2020/utils/props';

export default class UiLinkExternal extends Component {
  get target() {
    return defaultProp(this.args.target, '_blank');
  }
}
