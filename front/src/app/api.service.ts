import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  //basePath: string = "http://127.0.0.1:8000/api/la-centrale/";
  basePath: string = "http://141.145.197.98/api/la-centrale/";

  getLaCentrale(brand: string, model: string) {
    return fetch(this.basePath + brand + "/" + model, {
      method: 'GET'
    })
  }
}
