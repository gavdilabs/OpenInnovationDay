import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Fragment from "sap/ui/core/Fragment";
import DynamicSideContent from "sap/ui/layout/DynamicSideContent";
import Control from "sap/ui/core/Control";
import Dialog from "sap/m/Dialog";
import Event from "sap/ui/base/Event";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Group extends BaseController {
	private formatter = formatter;
	private _addProcessDialog: Dialog;
	private _addCountryDialog: Dialog;
	private _addNewGroupDialog: Dialog;
	private groupListFragment: Control;
	private groupDetailFragment: Control;

	public onInit(): void {
		this.getRouter()
		.getRoute("group")
		.attachPatternMatched(this.onGroupMatched, this);
	}

	async onGroupMatched(oEvent: Event): Promise<void> {
		if (!this.groupDetailFragment) {
			this.groupListFragment = sap.ui.xmlfragment(
				"groupListFragmentID",
				"com.gavdilabs.ui5template.view.fragments.GroupList",
				this
			) as Control;
			this.groupDetailFragment = sap.ui.xmlfragment(
				"groupDetailFragmentID",
				"com.gavdilabs.ui5template.view.fragments.GroupDetail",
				this
			) as Control;
			const DynamicSideContentGroup = this.getView().byId("DynamicSideContentGroup") as DynamicSideContent;
			DynamicSideContentGroup.addSideContent(this.groupListFragment);
			DynamicSideContentGroup.addMainContent(this.groupDetailFragment);
		}
		const groupID = oEvent.getParameter("arguments").groupID || "0";
		const groupDetailPage = Fragment.byId("groupDetailFragmentID", "GroupDetailPage")
		groupDetailPage.bindElement({
			path: "/Group(" + groupID + ")",
		});
	}

	public async addCountry() {
		const oView = this.getView();
		if (!this._addCountryDialog) {
			this._addCountryDialog = (await Fragment.load({
				id: oView.getId(),
				name: "com.gavdilabs.ui5template.view.fragments.AddCountryDialog",
				controller: this,
			})) as Dialog;
			oView.addDependent(this._addCountryDialog);
		}
		this._addCountryDialog.open();

	}
	public async addNewGroup(): Promise<void> {
		const oView = this.getView();

		if (!this._addNewGroupDialog) {
			this._addNewGroupDialog = (await Fragment.load({
				id: oView.getId(),
				name: "com.gavdilabs.ui5template.view.fragments.NewGroupDialog",
				controller: this,
			})) as Dialog;
			oView.addDependent(this._addNewGroupDialog);
		}

		this._addNewGroupDialog.open();
	}

	handleWizardCancel() {
		this._addNewGroupDialog.close();
	}

	public async addNewProcess(): Promise<void> {
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

	onCloseNewProcess() {
		this._addProcessDialog.close();
	}

	onClickedItem(ev: Event) {
		const groupID = ev.getParameter("listItem").getBindingContext().getObject().ID 
		this.navTo("group", {groupID: groupID});
	}
}
