import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public handleCountryNav() : void {
		this.navTo("country");
	}

	public handleGroupNav() : void {
		this.navTo("group");
	}

}
