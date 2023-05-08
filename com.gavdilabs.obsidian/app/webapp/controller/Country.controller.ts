import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Fragment from "sap/ui/core/Fragment";
import UI5Element from "sap/ui/core/Element";
import DynamicSideContent from "sap/ui/layout/DynamicSideContent";
import Control from "sap/ui/core/Control";
import List from "sap/m/List";
import StandardListItem from "sap/m/StandardListItem";
import Dialog from "sap/m/Dialog";
import JSONModel from "sap/ui/model/json/JSONModel";
import Table from "sap/ui/table/Table";
import Event from "sap/ui/base/Event";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Country extends BaseController {
	private formatter = formatter;
	private _editProcessDialog: Dialog;
	private _editGroupDialog: Dialog;

	public onInit(): void {
		this.getRouter()
		.getRoute("country")
		.attachPatternMatched(this.onCountryMatched, this);
	}


	async onCountryMatched(oEvent: Event): Promise<void> {
		const countryListFragmentID = Fragment.byId("countryListFragmentID", "CountryDetailPage");
		if (!countryListFragmentID) {
			const countryListFragmentCreate = sap.ui.xmlfragment(
				"countryListFragmentID",
				"com.gavdilabs.ui5template.view.fragments.CountryList",
				this
			) as Control;
			const countryDetailFragmentCreate = sap.ui.xmlfragment(
				"countryDetailFragmentID",
				"com.gavdilabs.ui5template.view.fragments.CountryDetail",
				this
			) as Control;
			const DynamicSideContentCountry = this.getView().byId("DynamicSideContentCountry") as DynamicSideContent;
			DynamicSideContentCountry.addSideContent(countryListFragmentCreate);
			DynamicSideContentCountry.addMainContent(countryDetailFragmentCreate);
			
			const obj3 = new JSONModel();
			obj3.setData([{ Name: "Item ID" }, { Name: "Duration" }, { Name: "Completion status" }, { Name: "Completed date" }]);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalLMStable") as Table).setModel(obj3);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalLMStable") as Table).bindRows("/");
	
	
			const obj4 = new JSONModel();
			obj4.setData([{ Name: "Social security number" }, { Name: "Tax documents" }]);
			(sap.ui.getCore().byId("countryDetailFragmentID--countryDocumentstable") as Table).setModel(obj4);
			(sap.ui.getCore().byId("countryDetailFragmentID--countryDocumentstable") as Table).bindRows("/");
	
			const obj5 = new JSONModel();
			obj5.setData([{ Name: "Contracts" }, { Name: "Addendum" }]);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalDocumentstable") as Table).setModel(obj5);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalDocumentstable") as Table).bindRows("/");
		
			
			const obj = new JSONModel();
			obj.setData([{ Name: "Last Name" }, { Name: "First Name" }, { Name: "Global ID" }, { Name: "Location" }, { Name: "Cost center" }]);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalECtable") as Table).setModel(obj);
			(sap.ui.getCore().byId("countryDetailFragmentID--globalECtable") as Table).bindRows("/");

			const obj2 = new JSONModel();
			obj2.setData([{ Name: "Item ID" }, { Name: "Duration" }, { Name: "Completion status" }, { Name: "Completed date" }]);
			(sap.ui.getCore().byId("countryDetailFragmentID--euLMStable") as Table).setModel(obj2);
			(sap.ui.getCore().byId("countryDetailFragmentID--euLMStable") as Table).bindRows("/");
		}
		const countryID = oEvent.getParameter("arguments").countryID || "0";
		const countryDetailPage = (sap.ui.getCore().byId("countryDetailFragmentID--CountryDetailPage"))
		countryDetailPage.bindElement({
			path: "/Country(" + countryID + ")",
		});

	}
	onAfterRendering(): void {
		//(sap.ui.getCore().byId("countryListFragmentID--CountryList") as List).setSelectedItem(sap.ui.getCore().byId("countryListFragmentID--poland") as StandardListItem)
	}

	public async addNewProcess(): Promise<void> {
		const oView = this.getView();

		if (!this._editProcessDialog) {
			this._editProcessDialog = (await Fragment.load({
				id: oView.getId(),
				name: "com.gavdilabs.ui5template.view.fragments.EditProcessDialog",
				controller: this,
			})) as Dialog;
			oView.addDependent(this._editProcessDialog);
		}

		this._editProcessDialog.open();
	}

	public async editGroup(): Promise<void> {
		const oView = this.getView();

		if (!this._editGroupDialog) {
			this._editGroupDialog = (await Fragment.load({
				id: oView.getId(),
				name: "com.gavdilabs.ui5template.view.fragments.EditGroupDialog",
				controller: this,
			})) as Dialog;
			oView.addDependent(this._editGroupDialog);
		}

		this._editGroupDialog.open();
	}

	onCloseGroupDialog() {
		this._editGroupDialog.close();
	}

	onCloseProcessDialog() {
		this._editProcessDialog.close();
	}
}
