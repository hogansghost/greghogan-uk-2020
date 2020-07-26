import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LayoutHeroBanner extends Component {
  @tracked author = null;
  @tracked backgroundSrcSet = null;
}
