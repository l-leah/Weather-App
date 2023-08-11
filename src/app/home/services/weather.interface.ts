interface OpenWeatherAPIResponse {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  weather: Weather[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: any;
}

interface OpenFutureWeatherAPIResponse {
  list: OpenFutureWeatherList[];
  city: OpenFutureWeatherCity;
}

interface OpenFutureWeatherList {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: OpenFutureWeather[];
}

interface OpenFutureWeatherCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface OpenFutureWeather {
  id: number;
  main: string;
  description: string;
  icon: any;
}

interface ForecastWeather extends OpenFutureWeatherList {
  date: string;
  day: string;
  month: string;
  weekDay: string;
}

interface HourForecastWeather extends OpenFutureWeatherList {
  date: string;
  time: string;
}

export type {
  OpenWeatherAPIResponse,
  OpenFutureWeatherAPIResponse,
  OpenFutureWeatherList,
  ForecastWeather,
  HourForecastWeather,
};
