import Component from '@glimmer/component';

import { validateProp } from 'greghogan-uk-2020/utils/props';

const Sizes = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  NONE: 'none',
  TOP_ONLY: 'top-only',
  BOTTOM_ONLY: 'bottom-only',
};

export default class extends Component {
  get gutterVerticalValue() {
    return validateProp(this.args.gutterVertical, Sizes, Sizes.MD);
  }

  get gutterVerticalSpacer() {
    return `gutter-vertical-${this.gutterVerticalValue}`;
  }
}
