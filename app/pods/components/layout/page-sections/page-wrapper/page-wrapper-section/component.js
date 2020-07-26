import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
  @tracked gutterVertical = 'md';
  @tracked hasOverlap = false;
  @tracked gutterVerticalTopOnly = false;
  @tracked gutterVerticalBottomOnly = false;

  get gutterVerticalValue() {
    return this.args.gutterVertical || 'md';
  }

  get gutterVerticalSpacer() {
    return `gutter-vertical-${this.gutterVerticalValue}`;
  }
}
