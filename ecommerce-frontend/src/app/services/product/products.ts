import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http : HttpClient ) {
    
  }


  getCategory(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODE.GET_ALL_CATEGORY)
  }
}
