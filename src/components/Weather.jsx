import { useState } from 'react';
import "./weather.css";
import DisplayWeather from './DisplayWeather';

export default function Weather() {

    const [form, setForm] = useState({
        city: "",
        country: ""
    });

    const [weather, setWeather] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;

    // FETCH THE WEATHER DATA
    async function getWeatherData(e) {
        e.preventDefault();
        if (!form.city) {
            alert("Add a city, please...");
        } else {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API_KEY}`);
                const data = await res.json();

                data.cod !== "404" ? setWeather({data: data}) : alert("Not an actual city name...\nPlease check your spellin for each input.");
            } catch(error) {
                console.log("Something went wrong: ", error);
                alert("Please check your spellin for each input.")
            };
        };
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "city") {
            setForm({
                ...form,
                city: value
            })
        } else if (name === "country") {
            setForm({
                ...form,
                country: value
            });
        };
    };

  return (
    <div className='weather'>
        <span className="title">Weather</span>
        <br />
        <form action="">
            <input onChange={handleChange} type="text" name="city" placeholder="city"/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input onChange={handleChange} type="text" name="country" placeholder="country"/>
            <button className="getweather" onClick={getWeatherData}>Submit</button>
        </form>

        {
            weather.data !== undefined ?
            (
                <div>
                    <DisplayWeather data={weather.data} />
                </div>
            ) :
             null
        }

    </div>
  );
};