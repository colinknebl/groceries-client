import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { AlertController } from "ionic-angular";

class GroceryItem {
  private _name: string;
  private _quantity: number;
  private _price: number;
  private _priceFormatter: Intl.NumberFormat;

  constructor(
    name: string,
    quantity: number,
    price: number,
    priceFormatter: Intl.NumberFormat
  ) {
    this._name = name;
    this._quantity = quantity;
    this._price = price;
    this._priceFormatter = priceFormatter;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get formattedPrice(): string {
    return this._priceFormatter.format(this._price);
  }

  get formattedTotal(): string {
    const total = this._price * this._quantity;
    return this._priceFormatter.format(total);
  }
}

interface IInputData {
  name: string;
  quantity: string;
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private _priceFormatter: Intl.NumberFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD"
  });
  public groceries: GroceryItem[] = [
    new GroceryItem("Milk", 2, 2.99, this._priceFormatter),
    new GroceryItem("Bread", 4, 1.99, this._priceFormatter),
    new GroceryItem("Frozen Pizza", 1, 5.99, this._priceFormatter)
  ];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  public removeItem(item, itemIndex) {
    this.groceries.splice(itemIndex, 1);
    this._presentToast(item.name);
  }

  private _presentToast(itemName: string) {
    this.toastCtrl
      .create({
        message: `${itemName} removed successfully`,
        duration: 3000
      })
      .present();
  }

  public addItem() {
    this.alertCtrl
      .create({
        title: "Add Item",
        message: "Enter the name and quantity of the item",
        inputs: [
          {
            name: "name",
            placeholder: "name"
          },
          {
            name: "quantity",
            placeholder: "quantity",
            type: "number"
          }
        ],
        buttons: [
          {
            text: "Cancel",
            handler: data => {}
          },
          {
            text: "Add",
            handler: (data: IInputData) => {
              this.groceries.push(
                new GroceryItem(
                  data.name,
                  parseInt(data.quantity),
                  0,
                  this._priceFormatter
                )
              );
            }
          }
        ]
      })
      .present();
  }
}
