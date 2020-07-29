import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ExampleExampleGrid extends Component {
  @tracked heading = '';
  @tracked examples = null;
}
