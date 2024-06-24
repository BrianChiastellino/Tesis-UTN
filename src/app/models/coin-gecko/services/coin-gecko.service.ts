import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoinGecko } from "../interface/coin-gecko.models";
import { environment } from "../../../../environments/environment";


@Injectable({  providedIn: 'root' })

export class CoinGeckoService {

  private baseUrl: string = environment.coinGeckoUrl;
  private baseUrlTest: string = environment.coinGeckoTestUrl;

  constructor(private http: HttpClient) {}

  //todo: arreglar y poner un get

  public coinGeckoTest (): Observable<CoinGecko[]> {
    return this.http.get<CoinGecko[]>(`${ this.baseUrlTest }/CoinGeckoTest`);
  }

  public coinsGecko (): Observable<CoinGecko[]> {
    return this.http.get<CoinGecko[]>(`${ this.baseUrl }`);
  }



}
