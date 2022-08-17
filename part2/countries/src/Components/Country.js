import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({ data }) => {
    const [weather, setWeather] = useState("")
    const [isWeather, setIsWeather] = useState(false)

    const [lat, lon] = data.capitalInfo.latlng

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`)
        .then(res => {
           setWeather(res.data)
           setIsWeather(true)
         })
        }, [lat, lon])
        
        console.log(weather)
    const langs = <ul>{Object.values(data.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
    const flag = <img style={{ width: "300px" }} src={data.flags.svg} alt={`${data.name.common}'s flag`} />

    return (
        <div>
            <h2>{data.name.common}</h2>
            <p>capital {data.capital[0]}</p>
            <p>area {data.area}</p>
            <h3>Languages</h3>
            {langs}
            {flag}
            <h3>Weather in {data.capital[0]}</h3>
            <p>temperature {isWeather && weather.main.temp} Celsius</p>
            {isWeather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>}
            <p>wind {isWeather && weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country