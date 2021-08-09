import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../services.js';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

export default function Chart({ data: { confirmed, deaths, recovered }, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };

    fetchAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true, text: `Current state in ${country}`, font: { size: 18 }, padding: {
                bottom: 10
              }
            },
          }
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData.length
      ? (
        //component from react chart js
        <Line
          data={{
            labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            }, {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            },
            {
              data: dailyData.map((data) => data.recovered),
              label: 'Recovered',
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.5)',
              fill: true,
            },
            ],
          }}
        />) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}
