import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import * as Device from "sap/ui/Device";

/**
 * Interface created due to missing equiv from SAP side
 */
export interface IGetByKeyParams {
  $expand?: string | object;
  $filter?: string | string[];
  $select?: string | string[];
  $$canonicalPath?: boolean;
  $$groupId?: string;
  $$inheritExpandSelect?: boolean;
  $$ownRequest?: boolean;
  $$patchWithoutSideEffects?: boolean;
  $$updateGroupId?: string;
}

export enum ModelNames {
  ROLES = "Roles",
  USER_DETAILS = "UserDetails"
}

export default {
  createDeviceModel: () => {
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode(BindingMode.OneWay);
    return oModel;
  },
  createApplicationModel: () => {
    const oModel = new JSONModel({
		isBusy: false,
    value1: null,
    value2: null
	});
    oModel.setDefaultBindingMode(BindingMode.TwoWay);
    return oModel;
  },
};
