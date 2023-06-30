import { LayoutType } from "sap/f/library";
import BaseController from "./BaseController";
import Event from "sap/ui/base/Event";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class CandidateOverview extends BaseController {

	private _oView: View;
	onInit() : void  {
		this._oView = this.getView();
	}

	onListItemPress(oEvent:Event) : void{
		var oPage = this._oView.byId("flcDocMetadataTypes");

		oPage.setProperty("layout", LayoutType.TwoColumnsMidExpanded) 

		 
	}

	handleClose(oEvent:Event) : void {
		var oPage = this._oView.byId("flcDocMetadataTypes");

		oPage.setProperty("layout", LayoutType.OneColumn) 
	}

	onGoToMessage(oEvent:Event) : void {
		//TODO: get selected Leads and its Customer ID.
		//TODO: Send ID with navigation
		this.getRouter().navTo("main");
	}

}
