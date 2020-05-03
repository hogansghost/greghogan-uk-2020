import Component from "@glimmer/component";
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class CookieBar extends Component {
  @service cookies;

  @action
  acceptCookie() {
    this.cookies.acceptAllCookies();
  }
}
