import React , {useMemo} from 'react';
import styles from './styles.module.sass';
import watch from '@images/watch.png';
import { Chart } from 'react-charts';
import {IActivity} from '@screens/StudentPage/models/IActivity';

interface IViewTotalTimeProps {
    activity?: IActivity[];
}

const ViewActivity: React.FC<IViewTotalTimeProps> = props => {
  const activityData = props.activity.map(a=> [new Date(a.date), Math.ceil(a.seconds/60)]);
  const data = useMemo(
    () => [
      {
        label: 'Day',
        data: activityData,
      },
      {
        label: 'Day',
        data: activityData,
      }
    ],
    []
  );

  const series = React.useCallback(
    (s, i) => ({
      type:
        i % 2 === 0
          ? 'area'
          :  'line'       
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      {
        primary: true,
        position: 'bottom',
        type: 'utc',
        show: false
      },
      { position: 'left', type: 'linear', show: false }
    ],
    []
  );

  
 
  const getSeriesStyle = React.useCallback(
    series => ({
      color: series.index % 2 === 0 ? 
      `url(#1)` : '#58C2F1'
    }),
    []
  )
  const tooltip = React.useMemo(
    () => ({
      render: props => {
        return(
        <span style={{ fontSize: '1rem' }}>
        <span role="img" aria-label="icon">
          🕑
        </span>{' '}
        <span>{`${props?.datum?.originalDatum? props?.datum?.originalDatum[1] : 0} mins at 
        ${props?.datum?.originalDatum ? (props?.datum?.originalDatum[0]).toString().split(' ').slice(1, 3).join(' ') : 0}`}</span>
      </span>
    );}}),
    []
  );

  const defs = (
    <defs>
      <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#58c3f10a" />
<stop offset="100%" stopColor="#58c3f1d3" />
    </linearGradient>
    </defs>
  )
return (
  <div className={styles.activityBlock}>
   <div
      style={{
        width: '400px',
        height: '120px',
      }}
    >
       <Chart 
        data={data} 
        series={series} 
        axes={axes} 
        getSeriesStyle={getSeriesStyle}
        primaryCursor={{showLabel: false}}
        getDatumStyle={datum => ({
          color: datum.originalDatum.color
        })}
        renderSVG={() => defs}
        tooltip={tooltip}
        />
    </div>
    <span>Weekly activity </span>
  </div>
  );
};

export default ViewActivity;
