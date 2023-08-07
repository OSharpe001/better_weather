import "./displayWeather.css";
import { useState } from "react";

export default function DisplayWeather({ data }) {

    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    const [showInFahrenheit, setShowInFahrenheit] = useState(true);
    const [mileDistanceUnit, setMileDistanceUnit] = useState(true);

    const changeDegree = () => {
        setShowInFahrenheit(!showInFahrenheit);
    };

    const changeDistanceUnit = () => {
        setMileDistanceUnit(!mileDistanceUnit);
    };

    const fahrenheit = Math.floor((data.main.temp - 273.15) * 1.8) + 32;
    const daysHighFahrenheit = Math.floor((data.main.temp_max - 273.15) * 1.8) + 32;
    const daysLowFahrenheit = Math.floor((data.main.temp_min - 273.15) * 1.8) + 32;
    const celsius = Math.floor(data.main.temp - 273.15);
    const daysHighCelsius = Math.floor(data.main.temp_max - 273.15);
    const daysLowCelsius = Math.floor(data.main.temp_min - 273.15);
    const feelsLikeFahrenheit = Math.floor((data.main.feels_like - 273.15) * 1.8) + 32;
    const feelsLikeCelsius = Math.floor(data.main.feels_like - 273.15);


  return (
    <div className="displayweather">
        <div className="maincard">
            <span className="cardtitle">
                {data.name}, {data.sys.country} Weather
            </span>
            <span className="cardsubtitle">
                As of {new Date().toLocaleTimeString()}
            </span>
            <div className="degree-display">
                <h1>
                    {showInFahrenheit ?
                        `${fahrenheit}˚ F` :
                        `${celsius}˚ C`
                    }
                </h1>
                <button className="temp-type" onClick={changeDegree} >
                    {!showInFahrenheit ? "F˚" : "C˚"}
                </button>
            </div>
            <span className="weather-main">
                <img src={iconURL} alt="weather type" className="weather-icon"/>
            </span>
            <span className="weather-description">
                {data.weather[0].description}
            </span>
        </div>
        <div className="weatherdetails">
            <div className="section1">
                <table>
                    <tr>
                        <td>
                            <h4>Low/High</h4>
                        </td>
                        <td>
                            <span>
                                {showInFahrenheit ?
                                    `${daysLowFahrenheit}˚ / ${daysHighFahrenheit}˚ F` :
                                    `${daysLowCelsius}˚ / ${daysHighCelsius}˚ C`
                                }
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Humidity</h4>
                        </td>
                        <td>
                            <span>
                                {data.main.humidity} %
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Pressure</h4>
                        </td>
                        <td>
                            <span>
                                {data.main.pressure} hPa / {(data.main.pressure * .02953337).toFixed(2)} inHg
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Visibility</h4>
                        </td>
                        <td>
                            <span className="visibility">
                                {
                                    !mileDistanceUnit ?
                                    `${data.visibility / 1000} km` :
                                    `${(data.visibility / 1000 * .62).toFixed(2)} mi`
                                }
                                <button className="change-visibility"onClick={changeDistanceUnit}>
                                    {!mileDistanceUnit ? "mi" : "km"}
                                </button>
                            </span>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="section2">
                <table>
                    <tr>
                        <td>
                            <h4>Feels Like</h4>
                        </td>
                        <td>
                            <span>
                                {showInFahrenheit ?
                                    `${feelsLikeFahrenheit}˚ F` :
                                    `${feelsLikeCelsius}˚ C`
                                }
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Sunrise</h4>
                        </td>
                        <td>
                            <span>
                            {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Sunset</h4>
                        </td>
                        <td>
                            <span>
                                {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Wind</h4>
                        </td>
                        <td>
                            <span>
                                Speed: {
                                            !mileDistanceUnit ?
                                            `${Math.round(data.wind.speed * 18 / 5)} km/hr` :
                                            `${Math.round(data.wind.speed * 18 / 5 * .62)} mi/hr`
                                        }
                                <br/>
                                Direction: {data.wind.deg}˚ deg
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  );
};