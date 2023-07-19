import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
import car from './image/search.jpg'
import cloud from './image/cloud.png'
import humidity from './image/humidity.png'
import wind from './image/wind.png'


function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: {cloud}
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
const handleClick = () => {
  if(name !== ""){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c493a31648a7c35b903b4f990d5c11c9&units=metric`;
    axios.get(apiUrl)
    .then(res => {
      let imagePath ='';
      if(res.data.weather[0].main == "Clouds") {
        imagePath = "/image/cloud.png"
      }else if(res.data.weather[0].main == "Clear") {
        imagePath = "/image/clear.png"
      }else if(res.data.weather[0].main == "Rain") {
        imagePath = "/image/rain.png"
      }else if(res.data.weather[0].main == "Drizzle") {
        imagePath = "/image/drizzle.png"
      }else if(res.data.weather[0].main == "Mist") {
        imagePath = "/image/mist.png"
      }else {
        imagePath = '/image/cloud.png'
      }
      console.log(res.data);
      setData({...data, celcius: res.data.main.temp,name: res.data.name,
    humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image: imagePath })
        setError('');
  })
    .catch( err => {
      if(err.response.status == 404) {
        setError("Invalid City Name")
      }else {
        setError('');
      }
      console.log(err)
    });
  }
}

  return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                <button><img src={car} onClick={handleClick} alt=""  /></button>
            </div>
            <div className="error">
              <p>{error}</p>
            </div>
            <div className="winfo">
              <img src={cloud} className='icon' alt=""/>
              <h1>{Math.round(data.celcius)}°c</h1>
              <h2>{data.name}</h2>
              <div className="deatails">
                <div className="col">
                    <img src={humidity} alt=""/>
                    <div className='humidity'>
                      <p>{Math.round(data.humidity)}%</p>
                      <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt=""/>
                    <div className='wind'>
                      <p> {Math.round(data.speed)} km/h</p>
                      <p>Wind</p>
                    </div>
                </div>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default Home