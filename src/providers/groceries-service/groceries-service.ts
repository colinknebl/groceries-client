import { Injectable } from "@angular/core";
import { GroceryItem } from "../../models/GroceryItem";

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {
  private _priceFormatter: Intl.NumberFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD"
  });
  public groceries: GroceryItem[] = [];

  constructor() {}

  public removeItem(itemIndex: number): void {
    this.groceries.splice(itemIndex, 1);
  }

  public addItem(name: string, quantity: number): void {
    this.groceries.push(
      new GroceryItem(name, quantity, 0, this._priceFormatter)
    );
  }

  public editItem(name: string, quantity: number, itemIndex: number): void {
    this.groceries[itemIndex] = new GroceryItem(
      name,
      quantity,
      0,
      this._priceFormatter
    );
  }
}
