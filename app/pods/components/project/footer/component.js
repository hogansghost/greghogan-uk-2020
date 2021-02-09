import Component from '@glimmer/component';

export default class ProjectFooter extends Component {
  get author() {
    return this.args.author;
  }

  get contactLinks() {
    const contacts = this.args.author?.profileLinks || [];

    return contacts.filter((link) => link.type === 'personal');
  }

  get copyright() {
    const start = this.author?.copyright?.start;
    const end = this.author?.copyright?.end;

    return start && end ? `${start} - ${end}` : new Date().getFullYear();
  }
}
