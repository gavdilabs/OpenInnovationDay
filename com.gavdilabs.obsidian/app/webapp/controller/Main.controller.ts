import BaseController from "./BaseController";
import formatter from "../model/formatter";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;

	public handleCountryNav() : void {
		// set to nav to Poland
		this.navTo("country", {countryID: "e596869d-f4c6-4ca6-a5a1-2d03abccaf61"});
	}

	public handleGroupNav() : void {
		// set to nav to EU
		this.navTo("group", {
			groupID: "e596869d-f4c6-4ca6-a5a1-2d03abccaf39"
		});
	}

}
