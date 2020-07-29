import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProjectContentTechGrid extends Component {
  @tracked technology = null;
  @tracked title = '';

  get sectionTitle() {
    return this.args.title || 'Tech stack';
  }
}
