import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { format } from 'date-fns';
import { uniqBy } from 'lodash';
import { WeatherService } from './services/weather.service';
import {
  ForecastWeather,
  HourForecastWeather,
} from './services/weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todayDate = this.dateToUTC(new Date());
  todayDateFormat = format(this.dateToUTC(new Date()), 'ddMMyyyy');
  weatherArray: any;
  weatherIcon: any;
  weatherFutureArray: any;
  weatherFutureIcon: any;
  forecastArray: ForecastWeather[] = [];
  hourArray: HourForecastWeather[] = [];
  city = 'Taguig';

  constructor(
    private weatherService: WeatherService,
    private alertCtrl: AlertController
  ) {
    this.getWeatherInformation(this.city);
    this.getWeatherFutureInformation(this.city);
    this.getWeatherHourInformation(this.city);
  }
  //timezone conversion
  private dateToUTC(date: Date) {
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }
  //today forecast
  public getWeatherInformation(queryString: string): void {
    this.weatherService.getWeatherForecast(queryString).subscribe({
      next: (result) => {
        this.weatherService.weatherData = result;
        this.todayDate = this.dateToUTC(new Date(result.dt * 1000));
        this.weatherArray = result['weather'][0];
        this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherArray.icon}@4x.png`;
        console.log(this.weatherData);
      },
      error: (err) => {
        this.alertCtrl.create({
          header: 'Unable to get the weather data',
          message: 'There is a problem on retrieving weather information',
          buttons: ['OK'],
        });
      },
    });
  }
  //today 3-hour forecast
  public getWeatherHourInformation(queryString: string): void {
    this.weatherService.getWeatherHourForecast(queryString).subscribe({
      next: (result) => {
        console.log(result);
        this.hourArray = result.list
          .map((v) => {
            return {
              ...v,
              date: format(this.dateToUTC(new Date(v.dt * 1000)), 'ddMMyyyy'),
              time: format(this.dateToUTC(new Date(v.dt * 1000)), 'h:mm a'),
            };
          })
          .filter((a) => a.date == this.todayDateFormat);
        console.log(this.hourArray);
      },
      error: (err) => {
        this.alertCtrl.create({
          header: 'Unable to get the weather future forecast data',
          message:
            'There is a problem on retrieving weather future forecast information',
          buttons: ['OK'],
        });
      },
    });
  }
  //5-day forecast
  public getWeatherFutureInformation(queryString: string): void {
    this.weatherService.getWeatherFutureForecast(queryString).subscribe({
      next: (result) => {
        this.forecastArray = result.list
          .map((v) => {
            return {
              ...v,
              date: format(this.dateToUTC(new Date(v.dt * 1000)), 'ddMMyyyy'),
              day: format(this.dateToUTC(new Date(v.dt * 1000)), 'dd'),
              month: format(this.dateToUTC(new Date(v.dt * 1000)), 'MMM'),
              weekDay: format(this.dateToUTC(new Date(v.dt * 1000)), 'E'),
            };
          })
          .filter((a) => a.date !== this.todayDateFormat);
        this.weatherFutureArray = result['list'][0];
        this.weatherFutureIcon = `https://openweathermap.org/img/wn/${this.weatherFutureArray.weather[0].icon}@4x.png`;
        this.forecastArray = uniqBy(this.forecastArray, 'date');
        console.log(this.forecastArray);
      },
      error: (err) => {
        this.alertCtrl.create({
          header: 'Unable to get the weather future forecast data',
          message:
            'There is a problem on retrieving weather future forecast information',
          buttons: ['OK'],
        });
      },
    });
  }
  public get weatherData() {
    return this.weatherService.weatherData;
  }
}
