import Component from '@glimmer/component';

const LinkTypes = {
  PERSONAL: 'personal',
};

export default class ContactMe extends Component {
  get description() {
    return this.args.description || [];
  }

  get contactLinks() {
    const links = this.args.links || [];

    return links.filter((link) => (
      link.type === LinkTypes.PERSONAL
    ));
  }
}
