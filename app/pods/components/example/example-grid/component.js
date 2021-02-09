import Component from '@glimmer/component';

export default class ExampleExampleGrid extends Component {
  get exampleList() {
    const examples = this.args.examples || [];

    return examples.sort((a, b) => {
      return b.id - a.id
    });
  }
}
