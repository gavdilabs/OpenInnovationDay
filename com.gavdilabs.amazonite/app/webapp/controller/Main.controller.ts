import BaseController from "./BaseController";
import formatter from "../model/formatter";
import { IRolesOutRoot } from "common";
import Event from "sap/ui/base/Event";
import Input from "sap/m/Input";
import MessageBox from "sap/m/MessageBox";
import { ModelNames } from "../model/models";
import JSONModel from "sap/ui/model/json/JSONModel";
import Message from "sap/ui/core/Message";
import Button from "sap/m/Button";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace com.gavdilabs.ui5template.controller
 */
export default class Main extends BaseController {
  private formatter = formatter;

  public async onSearchUser(event: Event): Promise<void> {
    //Gotta love TS & SAPUI5 - we need to cast to allow getSource
    const oButton = (event.getSource() as Button);
    var userId = "";
    
    //Same username? => return
    if (
      this.getModel(ModelNames.USER_DETAILS) &&
      userId ===
        (this.getModel(ModelNames.USER_DETAILS) as JSONModel).getProperty(
          "/userId"
        )
    ) {
      return;
    }
    
    //Set busy state
    this.getOwnerComponent().setIsBusy(true);
    var appData = (this.getModel("app") as JSONModel).getData();
    if(appData.value1 && appData.value2){
      userId = appData.value1 + "," + appData.value2;
      this.fillUserDetails(userId)
      .then(() => {
        this.fillUserRoles(userId);
        //Set busy state
        this.getOwnerComponent().setIsBusy(false);
      })
      .catch((errMessage: string) => {
        MessageBox.error(errMessage);
        //Set busy state
        this.getOwnerComponent().setIsBusy(false);
      });

    } else if (appData.value1) {
      userId = appData.value1;
      //First user details then fill the roles
      this.fillUserDetails(userId)
      .then(() => {
        this.fillUserRoles(userId);
        //Set busy state
        this.getOwnerComponent().setIsBusy(false);
      })
      .catch((errMessage: string) => {
        MessageBox.error(errMessage);
        //Set busy state
        this.getOwnerComponent().setIsBusy(false);
      });

    } else {
      MessageToast.show("Please fill out Field 1 or both fields..!");
      //Set busy state
      this.getOwnerComponent().setIsBusy(false);
      return;
    }
    
    //const userId = (event.getSource() as Input).getValue();


  }
}
