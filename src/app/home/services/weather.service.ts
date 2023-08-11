import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  OpenFutureWeatherAPIResponse,
  OpenWeatherAPIResponse,
} from './weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '750fe698b4127e5065930fa887be874a';
  private units = 'metric';
  public baseURL = 'https://api.openweathermap.org/data/2.5/';

  public weatherData: OpenWeatherAPIResponse = {} as OpenWeatherAPIResponse;
  public forecastArray: OpenFutureWeatherAPIResponse =
    {} as OpenFutureWeatherAPIResponse;
  public hourArray: OpenFutureWeatherAPIResponse =
    {} as OpenFutureWeatherAPIResponse;

  constructor(public http: HttpClient) {}

  getWeatherForecast(queryString: string) {
    return this.http.get<OpenWeatherAPIResponse>(
      `${this.baseURL}weather?q=${queryString}&appid=${this.apiKey}&units=${this.units}`
    );
  }
  getWeatherFutureForecast(queryString: string) {
    return this.http.get<OpenFutureWeatherAPIResponse>(
      `${this.baseURL}forecast?q=${queryString}&appid=${this.apiKey}&units=${this.units}`
    );
  }
  getWeatherHourForecast(queryString: string) {
    return this.http.get<OpenFutureWeatherAPIResponse>(
      `${this.baseURL}forecast?q=${queryString}&appid=${this.apiKey}&units=${this.units}`
    );
  }
}
