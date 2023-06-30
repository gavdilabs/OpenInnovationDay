import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Fragment from "sap/ui/core/Fragment";
import DynamicSideContent from "sap/ui/layout/DynamicSideContent";
import Control from "sap/ui/core/Control";
import Dialog from "sap/m/Dialog";
import Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Country extends BaseController {
	public formatter = formatter;
	private _editProcessDialog: Dialog;
	private _editGroupDialog: Dialog;
	private countryListFragment: Control;
	private countryDetailFragment: Control;


	public onInit(): void {
		this.getRouter()
		.getRoute("country")
		.attachPatternMatched(this.onCountryMatched, this);
	}

	async onCountryMatched(oEvent: Event): Promise<void> {
		if (!this.countryListFragment) {
			this.countryListFragment = sap.ui.xmlfragment(
				"countryListFragmentID",
				"com.gavdilabs.ui5template.view.fragments.CountryList",
				this
			) as Control;
			this.countryDetailFragment = sap.ui.xmlfragment(
				"countryDetailFragmentID",
				"com.gavdilabs.ui5template.view.fragments.CountryDetail",
				this
			) as Control;
			const DynamicSideContentCountry = this.getView().byId("DynamicSideContentCountry") as DynamicSideContent;
			DynamicSideContentCountry.addSideContent(this.countryListFragment);
			DynamicSideContentCountry.addMainContent(this.countryDetailFragment);
		}
		const countryID = oEvent.getParameter("arguments").countryID || "0";
		this.bindCountry(countryID)
	}

	private async bindCountry(countryID: string) {
		const countryDetailPage = Fragment.byId("countryDetailFragmentID", "CountryDetailPage")
		countryDetailPage.bindElement({
			path: "/Country(" + countryID + ")",
		});
		const ctx = this.getView().getModel().bindContext(`/GetCountryGroup(...)`) as ODataContextBinding;
		ctx.setParameter("countryID", countryID)
		await ctx.execute();
		const validGroups = await ctx.requestObject();		
		var aFilters = [];
		
		const countryFilter = new Filter({
			filters: [
			new Filter({ path: "rulesets/targetID", operator: FilterOperator.EQ, value1: countryID }),
			],
			and: false,
		});
		aFilters.push(countryFilter)
		
		validGroups.value.forEach((group: { groupID: any; }) => {
			const groupFilter = new Filter({
			filters: [
			new Filter({ path: "rulesets/targetID", operator: FilterOperator.EQ, value1: group.groupID }),
			],
			and: false,
		});
		aFilters.push(groupFilter)
		});
		// The main filter which inludes filtering on countryId and on valid groupIds
		const mainFilter = new Filter({
			filters: aFilters,
			and: false,
		});

		countryDetailPage.getBinding("sections").filter(
			new Filter({
				path: "rulesets", 
				operator: FilterOperator.All, //All here works as any
				variable : "rulesets", 
				condition : mainFilter 
		})
		);
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

	onClickedItem(ev: Event) {
		const countryID = ev.getParameter("listItem").getBindingContext().getObject().ID 
		this.navTo("country", {countryID: countryID});
	}
}
