import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LayoutPageWrapper extends Component {
  @tracked spacingUpper = false;
  @tracked spacingLower = false;
}
