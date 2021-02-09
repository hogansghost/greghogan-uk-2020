import Component from '@glimmer/component';

export default class AboutMe extends Component {
  get author() {
    return this.args.author;
  }
}
