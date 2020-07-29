import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProjectFooter extends Component {
  @tracked author = null;

  get contactLinks() {
    const contacts = this.args.author.profileLinks || [];

    return contacts.filter((link) => link.type === 'personal');
  }
}
