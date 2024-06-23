import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { CoinGecko } from "../interface/coin-gecko.models";

@Injectable({  providedIn: 'root' })

export class CoinGeckoService {

  private baseUrl: string = environment.coinGeckoUrl;
  private baseUrlTest: string = environment.coinGeckoTestUrl;

  constructor(private http: HttpClient) {}

  public coinGeckoTest (): Observable<CoinGecko[]> {
    return this.http.get<CoinGecko[]>(`${ this.baseUrlTest }/CoinGeckoTest`);
  }

  public coinsGecko (): Observable<CoinGecko[]> {
    return this.http.get<CoinGecko[]>(`${ this.baseUrl }`);
  }



}
