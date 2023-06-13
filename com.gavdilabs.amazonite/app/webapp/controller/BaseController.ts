import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import { IGetByKeyParams, ModelNames } from "../model/models";
import MessageBox from "sap/m/MessageBox";
import { IRolesOutRoot } from "common";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default abstract class BaseController extends Controller {
  /**
   * Convenience method for accessing the component of the controller's view.
   * @returns The component of the controller's view
   */
  public getOwnerComponent(): AppComponent {
    return super.getOwnerComponent() as AppComponent;
  }

  /**
   * Convenience method to get the components' router instance.
   * @returns The router instance
   */
  public getRouter(): Router {
    return UIComponent.getRouterFor(this);
  }

  /**
   * Convenience method for getting the i18n resource bundle of the component.
   * @returns The i18n resource bundle of the component
   */
  public getResourceBundle(): ResourceBundle | Promise<ResourceBundle> {
    const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
    return oModel.getResourceBundle();
  }

  /**
   * Convenience method for getting the view model by name in every controller of the application.
   * @param [sName] The model name
   * @returns The model instance
   */
  public getModel(sName?: string): Model {
    return this.getView().getModel(sName);
  }

  /**
   * Convenience method for setting the view model in every controller of the application.
   * @param oModel The model instance
   * @param [sName] The model name
   * @returns The current base controller instance
   */
  public setModel(oModel: Model, sName?: string): BaseController {
    this.getView().setModel(oModel, sName);
    return this;
  }

  /**
   * Convenience method for triggering the navigation to a specific target.
   * @public
   * @param sName Target name
   * @param [oParameters] Navigation parameters
   * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
   */
  public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
    this.getRouter().navTo(sName, oParameters, undefined, bReplace);
  }

  /**
   * Convenience event handler for navigating back.
   * It there is a history entry we go one step back in the browser history
   * If not, it will replace the current entry of the browser history with the main route.
   */
  public onNavBack(): void {
    const sPreviousHash = History.getInstance().getPreviousHash();
    if (sPreviousHash !== undefined) {
      window.history.go(-1);
    } else {
      this.getRouter().navTo("main", {}, undefined, true);
    }
  }

  /**
   *
   * @param path Direct path to the data to read including key ie /User('123')
   * @param parameters Optional odata parameters
   * @returns
   */
  public async getByKey2Object<T>(
    path: string,
    parameters?: IGetByKeyParams
  ): Promise<T> {
    return (await (
      (this.getView().getModel() as ODataModel).bindContext(
        path,
        undefined
      ) as ODataContextBinding
    ).requestObject()) as T;
  }

  /**
   *
   * @param path Direct path to the data to read including key ie /User('123')
   * @param modelName Name of the JSON model for the data
   * @param parameters Optional odata parameters
   */
  public async getByKey2JSONModel<T>(
    path: string,
    modelName: string,
    parameters: IGetByKeyParams
  ) {
    if (this.getModel(modelName)) {
      this.setModel(new JSONModel({}), modelName);
    }
    //let dataObject = await this.getByKey2Object<T>(path, parameters);
    const oModel = this.getView().getModel() as ODataModel;
    var that = this, aData = [] as any[], dataObject = {} as object;
    var aFilter = [] as any[];

    if(parameters.toString().indexOf(",") > 0){
      var aUserIds = parameters.toString().split(",");
      for (var i = 0; i < aUserIds.length; i++) {
        aFilter.push(new Filter("userId", FilterOperator.EQ, aUserIds[i]));
      }
    } else {
      aFilter.push(new Filter("userId", FilterOperator.EQ, parameters));
    }

		var oOrFilter = new Filter({
			filters: aFilter,
			and: false,
		});
    this.GenericBindList(path, oModel, oOrFilter).then(async function(respomse){
      if(modelName === "UserDetails" && respomse[0]){
        var userInfo1, userInfo2;
        if(respomse[1]?.getObject()){
          userInfo1 = respomse[0]?.getObject().userId === aUserIds[0] ? respomse[0]?.getObject() : respomse[1]?.getObject();
          userInfo2 = respomse[1]?.getObject().userId === aUserIds[1] ? respomse[1]?.getObject() : respomse[0]?.getObject();
        } else {
          userInfo1 = respomse[0].getObject();
        }

        that.setModel(new JSONModel({
          user1: userInfo1,
          user2: userInfo2
        }), modelName);
        var sPhoto = "data:image/jpeg;base64," +  that.getView().getModel("DefaultProfileImg").getData().DefaultImg;
        if(userInfo1.userId){
          const user1Filters = new Filter({
            filters: [
              new Filter("userId", FilterOperator.EQ, userInfo1.userId),
              new Filter("photoType", FilterOperator.EQ, "1")
            ],
            and: true,
          });
          const photo1 = await that.GenericBindList("/Photo", oModel, user1Filters);
          if(photo1[0]){
            var sPhoto = "data:" + photo1[0]?.getObject()?.mimeType + ";base64," + photo1[0]?.getObject()?.photo;
          }
          //that.getView().byId("photoUser1").setSrc(sPhoto); 
          (that.getModel("UserDetails") as Model).setProperty("/user1/photo", sPhoto);
        }

        if(userInfo2.userId){
          sPhoto = "";
          const user2Filters = new Filter({
            filters: [
              new Filter("userId", FilterOperator.EQ, userInfo2.userId),
              new Filter("photoType", FilterOperator.EQ, "1")
            ],
            and: true,
          });
          var sPhoto = "data:image/jpeg;base64," +  that.getView().getModel("DefaultProfileImg").getData().DefaultImg;
          var photo2 = await that.GenericBindList("/Photo", oModel, user2Filters);
          if(photo2[0]){
            sPhoto = "data:" + photo2[0]?.getObject()?.mimeType + ";base64," + photo2[0]?.getObject()?.photo;
          }
          (that.getModel("UserDetails") as Model).setProperty("/user2/photo", sPhoto);
        }          
      } else {
        if((respomse as object[]).length === 2){
          if(that.getModel("UserDetails").getProperty("/user1").userId !== respomse[0].getObject().userId){
            var userPermission = respomse.pop();
            respomse.unshift(userPermission);
          }
           var dataObject = that.mergeArrays(respomse[0].getObject().roles,respomse[1].getObject().roles);
           that.setModel(new JSONModel({roles: dataObject as object}), modelName);
        } else {
          respomse.forEach(function (oContext) {
            dataObject = oContext.getObject();
            that.setModel(new JSONModel(dataObject as object), modelName);
          });
        }
      }
    })
        
  }

  private GenericBindList (path : string, model: Model, filter : Filter) {
    return new Promise(function (resolve, reject) {
      var oBindListUser = model.bindList(path, null, null, filter, {
        $$ownRequest: true
      });
      oBindListUser.requestContexts(0, Infinity).then(function (aContexts: any[]) {
        if(aContexts){
          resolve(aContexts);
        }
      });
    })
  }

  private mergeArrays (arr1 : any[], arr2 : any[]) {
    const mergedArray = [...arr1, ...arr2];
    const uniqueArray = mergedArray.reduce((acc, curr) => {
      if (!acc.find(item => item.name === curr.name)) {
        const source = {
          array1: arr1.some(item => item.name === curr.name),
          array2: arr2.some(item => item.name === curr.name)
        };
        acc.push({ ...curr, source });
      }
      return acc;
    }, []);
    return uniqueArray;
  }
  

  /**
   * Private function for filling the roles list
   * @param userId entered username in UI
   */
  public async fillUserRoles(userId: string): Promise<void> {
    if (this.getModel(ModelNames.ROLES)) {
      (this.getModel(ModelNames.ROLES) as JSONModel).setData({});
    }

    //Get user roles
    try {
      await this.getByKey2JSONModel<IRolesOutRoot>(
        `/Roles`,           //('${userId}')
        ModelNames.ROLES,
        userId
        
      );
    } catch {
      return Promise.reject("Failed to load user roles");
    } 
  }

  public async fillUserDetails(userId: string): Promise<void> {
    //Clear models - if there
    if (this.getModel(ModelNames.USER_DETAILS)) {
      (this.getModel(ModelNames.USER_DETAILS) as JSONModel).setData({});
    }

    //Get User details
    try {
      return await this.getByKey2JSONModel(
        `/User`,
        ModelNames.USER_DETAILS,
        userId
      );
    } catch {
      return Promise.reject("Failed to load user details");
    }
  }
}
