import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ContactMe extends Component {
  @tracked description = null;
  @tracked links = null;

  get contactLinks() {
    const links = this.args.links || [];

    return links.filter((link) => link.type === 'personal');
  }
}
