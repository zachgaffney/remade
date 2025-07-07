import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';
import { useEffect } from 'react';
import './WeatherWidget.css';

function WeatherWidget() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading weather...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem', borderRadius: '8px' }}>

      {data && (
        <>
          <p id="seattle-weather">Seattle: {(data.temperature * 9/5) + 32}°F</p>
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
