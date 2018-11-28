import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as moment from 'moment-timezone';

const WorkGraph = (dailyHours) => {
  const getOption = () => {
    dailyHours = dailyHours.dailyHours;
    return {
      grid: {
        top: 25
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        interval: 1,
        data: dailyHours.map(d => moment.tz(d.date, 'Europe/London').format('DD/MM/YYYY'))
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: dailyHours.map(d => d.hours),
          type: 'line'
      }]
    };
  }

  return (
    <div className="graph-container">
      <p style={{color: '#333', marginLeft: '20px', paddingTop: '20px'}}>Contracted hours per week: <span style={{fontWeight: 600}}>40</span></p>
      <p style={{color: '#333', marginLeft: '20px'}}>Total hours worked: <span style={{fontWeight: 600}}>{dailyHours.dailyHours.map(d => d.hours).reduce((t, n) => t + n)}</span></p>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};

export default WorkGraph;