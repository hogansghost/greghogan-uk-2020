import Component from '@glimmer/component';

export default class StatusMessage extends Component {
  get errorCode() {
    return this.args.code || 404;
  }

  get errorMessage() {
    return this.args.message || 'Not found';
  }
}
