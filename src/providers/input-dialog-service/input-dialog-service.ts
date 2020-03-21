import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { GroceriesServiceProvider } from "../groceries-service/groceries-service";
import { GroceryItem } from "../../models/GroceryItem";

interface IInputData {
  name: string;
  quantity: string;
}

interface IPromptDetails {
  title: string;
  message: string;
  confirmText: string;
  handler(data: IInputData, itemIndex?: number): void;
}

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {
  private _addDetails: IPromptDetails = {
    title: "Add Item",
    message: "Enter the name and quantity of the item",
    confirmText: "Add",
    handler: (data: IInputData) => {
      this.groceriesService.addItem(data.name, parseInt(data.quantity));
    }
  };
  private _editDetails: IPromptDetails = {
    title: "Edit Item",
    message: "Edit the name and quantity of the item",
    confirmText: "Edit",
    handler: (data: IInputData, itemIndex: number) => {
      this.groceriesService.editItem(
        data.name,
        parseInt(data.quantity),
        itemIndex
      );
    }
  };

  constructor(
    public alertCtrl: AlertController,
    public groceriesService: GroceriesServiceProvider
  ) {}

  public showPrompt(item?: GroceryItem, itemIndex?: number): void {
    const { title, message, confirmText, handler }: IPromptDetails = item
      ? this._editDetails
      : this._addDetails;

    this.alertCtrl
      .create({
        title,
        message,
        inputs: [
          {
            name: "name",
            placeholder: "name",
            value: item ? item.name : undefined
          },
          {
            name: "quantity",
            placeholder: "quantity",
            type: "number",
            value: item ? String(item.quantity) : undefined
          }
        ],
        buttons: [
          {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: confirmText,
            handler: (data: IInputData) => {
              handler(data, itemIndex);
            }
          }
        ]
      })
      .present();
  }
}
