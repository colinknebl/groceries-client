export class GroceryItem {
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
