import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Fragment from "sap/ui/core/Fragment";
import UI5Element from "sap/ui/core/Element";
import DynamicSideContent from "sap/ui/layout/DynamicSideContent";
import Control from "sap/ui/core/Control";
import View from "sap/ui/core/mvc/View";
import Dialog from "sap/m/Dialog";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/ui/table/Table";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Group extends BaseController {
	private formatter = formatter;
	private _addProcessDialog: Dialog;
	private _assignCountryDialog: Dialog;
	private _addNewGroupDialog: Dialog;
	public onInit(): void {
		const employeeDetailFragment = Fragment.byId("groupListFragmentID", "GroupDetailPage");
		if (!employeeDetailFragment) {
		const groupListFragmentCreate = sap.ui.xmlfragment(
			"groupListFragmentID",
			"com.gavdilabs.ui5template.view.fragments.GroupList",
			this
		) as Control;
		console.log(groupListFragmentCreate)
		const groupDetailFragmentCreate = sap.ui.xmlfragment(
			"groupDetailFragmentID",
			"com.gavdilabs.ui5template.view.fragments.GroupDetail",
			this
		) as Control;
		const DynamicSideContentGroup = this.getView().byId("DynamicSideContentGroup") as DynamicSideContent;
		DynamicSideContentGroup.addSideContent(groupListFragmentCreate);
		DynamicSideContentGroup.addMainContent(groupDetailFragmentCreate);
		/*const obj = new JSONModel();
		obj.setData([{Name: "Last Name"}, {Name: "First Name"}, {Name: "Global ID"}, {Name: "Location"}, {Name: "Cost center"}]);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalECtablegroup") as Table).setModel(obj);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalECtablegroup") as Table).bindRows("/");*/

		const obj = new JSONModel();
		obj.setData([{Name: "Last Name"}, {Name: "First Name"}, {Name: "Global ID"}, {Name: "Location"}, {Name: "Cost center"}]);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalECtableGroup") as Table).setModel(obj);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalECtableGroup") as Table).bindRows("/");

		const obj5 = new JSONModel();
		obj5.setData([{Name: "Contracts"}, {Name: "Addendum"}]);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalDocumentstableGroup") as Table).setModel(obj5);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalDocumentstableGroup") as Table).bindRows("/");

		const obj3 = new JSONModel();
		obj3.setData([{Name: "Item ID"}, {Name: "Duration"}, {Name: "Completion status"}, {Name: "Completed date"}]);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalLMStableGroup") as Table).setModel(obj3);
		(sap.ui.getCore().byId("groupDetailFragmentID--globalLMStableGroup") as Table).bindRows("/");

		}
	}

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public async addNewGroup() : Promise<void> {
		const oView = this.getView();

		if (!this._addNewGroupDialog) {
			this._addNewGroupDialog = (await Fragment.load({
			  id: oView.getId(),
			  name: "com.gavdilabs.ui5template.view.fragments.WizardDialog",
			  controller: this,
			})) as Dialog;
			oView.addDependent(this._addNewGroupDialog);
		  }
	  
		  this._addNewGroupDialog.open();
	}

	handleWizardCancel() {
		this._addNewGroupDialog.close();
	}
	public async addNewProcess() : Promise<void> {
		const oView = this.getView();

		if (!this._addProcessDialog) {
			this._addProcessDialog = (await Fragment.load({
			  id: oView.getId(),
			  name: "com.gavdilabs.ui5template.view.fragments.AddProcess",
			  controller: this,
			})) as Dialog;
			oView.addDependent(this._addProcessDialog);
		  }
	  
		  this._addProcessDialog.open();
	}

	
	public async addCountry() : Promise<void> {
		const oView = this.getView();

		if (!this._assignCountryDialog) {
			this._assignCountryDialog = (await Fragment.load({
			  id: oView.getId(),
			  name: "com.gavdilabs.ui5template.view.fragments.AddCountryDialog",
			  controller: this,
			})) as Dialog;
			oView.addDependent(this._assignCountryDialog);
		  }
	  
		  this._assignCountryDialog.open();
	}

	onCloseNewProcess () {
		this._addProcessDialog.close();
	}


}
