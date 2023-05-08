import BaseController from "./BaseController";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class App extends BaseController {

	public onInit() : void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		 this.getRouter().getRoute("candidateinfo").attachPatternMatched(this._onPatternMatched, this);
	}





	private _onPatternMatched(event: Event) {

	  }
}
