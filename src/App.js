import React, { useEffect, useState } from 'react';
import Cards from './Components/Cards';
import Chart from './Components/Chart';
import CountryPicker from './Components/CountryPicker';
import { fetchData } from './services';
import styles from './App.module.css';
import coronaImage from './images/image.png';

function App() {
  const [state, setstate] = useState({
    data: {},
    country: '',
  })

  useEffect(() => {
    fetchData().then((res) => {
      setstate({ data: res })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    setstate({ data: fetchedData, country: country })
  }

  return (
    <div className="App">
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID_19" />
        <Cards data={state.data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={state.data} country={state.country} />
      </div>
    </div>
  );
}

export default App;
