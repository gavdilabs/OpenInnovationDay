import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace com.gavdilabs.manager.controller
 */
export default class Login extends BaseController {
  private formatter = formatter;

  public onLogin(): void {
    const username = (this.byId("inp_userName") as Input).getValue();
    if (username) {
      MessageToast.show(`Welcome ${username}`);
      //TODO: navigate to candidate screen
    } else {
      MessageBox.error("Enter your username");
    }
  }
}
