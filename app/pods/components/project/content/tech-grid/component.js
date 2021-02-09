import Component from '@glimmer/component';

export default class ProjectContentTechGrid extends Component {
  get sectionTitle() {
    return this.args.title || 'Tech stack';
  }
}
