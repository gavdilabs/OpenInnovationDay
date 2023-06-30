import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";

import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import oDataModel from "sap/ui/model/odata/v4/ODataModel"
import Context from "sap/ui/model/odata/v4/Context";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import Fragment from "sap/ui/core/Fragment";
import Popover from "sap/m/Popover";
import Dialog from "sap/m/Dialog";
import Message from "sap/ui/core/message/Message";
import { MessageType } from "sap/ui/core/library";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import TextArea from "sap/m/TextArea";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import BusyIndicator from "sap/m/BusyIndicator";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;
	private mPopover: Popover;

	public onInit() : void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		 this.getRouter().getRoute("main").attachPatternMatched(this._onPatternMatched, this);
	}

	private _onPatternMatched(event: Event) {

	  }

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public askChatGPT(oEvent: Event): void {
		
		let sName = (this.getView().byId("NameInput") as Input).getValue();
		let sJobTitle = (this.getView().byId("JobInput") as Input).getValue();
		let sTone = (this.getView().byId("InputTone") as Input).getValue();
		let sMes = "My employee " +sName+" will start working in STG as a "+sJobTitle+", and I'd like to send her a " +sTone+" welcome email.";
		let sUrl = "https://api.openai.com/v1/chat/completions";
		let oBody = {
			"model": "gpt-3.5-turbo",
			"messages": [{"role": "user", "content": sMes}],
			"temperature": 0.7
		};
		let sBody = JSON.stringify(oBody);

		let that = this;

		(this.getView().byId("CustomBusy") as BusyIndicator).setVisible(true);
		(this.getView().byId("ResultMessage") as TextArea).setVisible(false);

		$.ajax({
			url: sUrl,
			method: "POST",
			contentType: "application/json",
			headers: {
				"Authorization": "Bearer xxxx"
			},
			data: sBody,	
			success: function (oData) {
				let sResult = oData.choices[0].message.content;
				(that.getView().byId("ResultMessage") as TextArea).setValue(sResult);
				(that.getView().byId("ResultMessage") as TextArea).setVisible(true);
				
				(that.getView().byId("CustomBusy") as BusyIndicator).setVisible(false);
			},
			error: function (oError) {                            
				                           
			}
		});

		
	}

	private openBusyView(oButton: Button) : void {
		Fragment.load({
            name: "com.gavdilabs.ui5template.view.fragments.BusyDialog",
            controller: this,
        }).then(popover => {
            this.mPopover = popover as Popover;            			
			this.getView().addDependent(this.mPopover);  
            this.mPopover.openBy(oButton,true);           
        });		
	}

	public onNavToCandidate () {
		//TODO: get selected Leads and its Customer ID.
		//TODO: Send ID with navigation
		this.getRouter().navTo("candidateinfo");
	  }

}
