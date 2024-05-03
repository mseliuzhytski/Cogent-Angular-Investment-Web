import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IbmapicallService {

  urlget="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
  urlgetm="https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=TSCO.LON&apikey=demo"

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<any>(this.urlget)
  }

  getM(){
    return this.http.get<any>(this.urlgetm)
  }

}


