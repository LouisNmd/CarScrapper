import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  path: string = "/la-centrale";

  private get(path: string, args: string) {
    return fetch(environment.api.url + path + args, {method: 'GET'})
  }

  getLaCentrale(brand: string, model: string) {
    return this.get(this.path, `/${brand}/${model}`)
  }
}
