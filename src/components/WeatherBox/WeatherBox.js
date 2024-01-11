import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [handleError, setHandleError] = useState(false);

  const handleCityChange = useCallback((city) => {

    setWeatherData('');
    setPending(true);
    setHandleError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=187c7fbdf54f1fdc9931e2f733daaa8f&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json()
          .then((data) => {

    setPending(false);

    const newData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
    };

    setWeatherData(newData);
    console.log('WeatherData', newData);
   });

  } else {
    setHandleError(true);
  }
  });

  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {pending && !weatherData && !handleError &&  <Loader />}

      {weatherData && <WeatherSummary
          city={weatherData.city}
          temp={weatherData.temp}
          icon={weatherData.icon}
          description={weatherData.description}
        />
      }
      {handleError &&  <ErrorBox />}
    </section>
  )
};

export default WeatherBox;