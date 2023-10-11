import React, { useEffect, useState } from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import api from '../../../lib/axios';

const LineChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(
        'https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv'
      )
      .then((response) => {
        setData(
          response?.data?.data?.map((item) => {
            return { x: item?.data_year, y: item?.Burglary };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {loading ? (
        'Loading ...'
      ) : (
        <div id='chart-class-name'>
          <div className='line-chart'>
            <VictoryChart
              height={300}
              width={1400}
              padding={{ top: 40, right: 30, bottom: 50, left: 80 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `Year: ${datum.x}, Value: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 10 }}
                      flyoutStyle={{
                        fill: 'white',
                        stroke: 'blue',
                        strokeWidth: 1,
                      }}
                    />
                  }
                />
              }
            >
              <VictoryAxis
                dependentAxis
                label='Arrests'
                style={{
                  axis: { stroke: '#BAC2DB' },
                  axisLabel: { fontSize: 9, padding: 50, fill: 'black' },
                  tickLabels: { fontSize: 9, fill: '#626E99', fontWeight: 500 },
                  grid: {
                    stroke: '#BAC2DB',
                    strokeWidth: 0.772,
                  },
                }}
                tickCount={5}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: '#BAC2DB' },
                  axisLabel: { fontSize: 15, padding: 40 },
                  tickLabels: { fontSize: 9, fill: '#626E99', fontWeight: 500 },
                }}
                tickCount={10}
                tickFormat={(x) => x}
              />
              <VictoryLine
                data={data}
                x='x'
                y='y'
                style={{ data: { stroke: '#1463FF', strokeWidth: 1.543 } }}
              />
            </VictoryChart>
          </div>
        </div>
      )}
    </>
  );
};

export default LineChart;
