import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";

/**
 * @namespace com.gavdilabs.manager.controller
 */
export default class Main extends BaseController {
  private formatter = formatter;

  public onPress(event: Event): void {
    this._showObject(event.getSource() as ColumnListItem);
  }

  private _showObject(item: ColumnListItem): void {
    this.getRouter().navTo("object", {
      objectId: item.getBindingContext().getProperty("ID"),
    });
  }
}
