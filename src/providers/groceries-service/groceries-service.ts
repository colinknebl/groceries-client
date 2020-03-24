import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { map, catchError } from "rxjs/operators";

import { GroceryItem } from "../../models/GroceryItem";

type ResponseItem = Pick<GroceryItem, "name" | "quantity"> & { _id: string };

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

  public dataChanged$: Observable<boolean>;
  private dataChangedSubject: Subject<boolean>;
  // private baseURL = "http://localhost:8080";
  private baseURL = 'https://groceries-server-ck.herokuapp.com';

  constructor(public httpClient: HttpClient) {
    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  public getItems(): Observable<any> {
    return this.httpClient
      .get(`${this.baseURL}/api/groceries`)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private handleError(error: Error): Observable<GroceryItem[]> {
    console.error(error);
    return Observable.throw([]);
  }

  private extractData(resBody: ResponseItem[]): GroceryItem[] {
    const groceryItems: GroceryItem[] = [];
    if (resBody.length) {
      resBody.forEach(item => {
        groceryItems.push(
          new GroceryItem(
            item._id,
            item.name,
            item.quantity,
            0,
            this._priceFormatter
          )
        );
      });
    }
    this.groceries = groceryItems;
    return groceryItems;
  }

  private _crudCallback = (res: any) => {
    this.groceries = this.extractData(res as any);
    this.dataChangedSubject.next(true);
  };

  public removeItem(item: GroceryItem): void {
    this.httpClient
      .delete(`${this.baseURL}/api/groceries/${item.id}`)
      .subscribe(this._crudCallback);
  }

  public addItem(name: string, quantity: number): void {
    this.httpClient
      .post(
        `${this.baseURL}/api/groceries`,
        { name, quantity },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .subscribe(this._crudCallback);
  }

  public editItem(name: string, quantity: number, item: GroceryItem): void {
    this.httpClient
      .put(`${this.baseURL}/api/groceries/${item.id}`, { name, quantity })
      .subscribe(this._crudCallback);
  }
}
