import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

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

  constructor(public navCtrl: NavController) {}
}
