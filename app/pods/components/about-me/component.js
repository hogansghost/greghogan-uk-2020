import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class AboutMe extends Component {
  @tracked author = null;
}
