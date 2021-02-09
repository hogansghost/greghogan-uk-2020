import Component from '@glimmer/component';

export default class ProjectContentImageGrid extends Component {
  get columns() {
    return this.args.colCount || 2;
  }
}
