import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ExampleExampleGrid extends Component {
  @tracked heading = '';
  @tracked examples = null;

  get exampleList() {
    const examples = this.args.examples || [];

    return examples.sort((a, b) => {
      return b.id - a.id
    });
  }
}
