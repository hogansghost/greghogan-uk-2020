import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProjectContentImageGrid extends Component {
  @tracked colCount = 2;
  @tracked media = null;

  get columns() {
    return this.args.colCount || 2;
  }
}
