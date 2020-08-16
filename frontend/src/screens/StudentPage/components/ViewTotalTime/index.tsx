import React from 'react';
import styles from './styles.module.sass';
import watch from '@images/watch.png';

interface IViewTotalTimeProps {
    totalTime: number;
}

const ViewTotalTime: React.FC<IViewTotalTimeProps> = props => {
  let { totalTime } = props;
  console.log(totalTime);
  const YEAR = 60 * 60 * 24 * 365;
  const DAY = 60 * 60 * 24;
  const HOUR = 60 * 60;
  const MIN = 60;
  console.log(totalTime);
  const years = totalTime > YEAR ? Math.trunc(totalTime / YEAR) : undefined;
  totalTime = years ? totalTime - years * YEAR : totalTime;
  const days = (totalTime > DAY || years) ? Math.trunc(totalTime / DAY) : undefined;
  totalTime = days ? totalTime - days * DAY : totalTime;
  const hours = (totalTime > HOUR || days) ? Math.trunc(totalTime / HOUR) : undefined;
  totalTime = hours ? totalTime - hours * HOUR : totalTime;
  const mins = (totalTime > MIN || hours) ? Math.trunc(totalTime / MIN) : 0;
  return (
    <div className={styles.timeBlock}>
      <img className={styles.iconTime} src={watch} alt="Clock" />
      <div className={styles.text}>
        <div className={styles.timeLine}>
          {years && (
            <>
              <div className={styles.timeText}>{years}</div>
              <div className={styles.typeText}>y</div>
            </>
          )}
          {days && (
            <>
              <div className={styles.timeText}>{days}</div>
              <div className={styles.typeText}>d</div>
            </>
          )}
          {hours && (
            <>
              <div className={styles.timeText}>{hours}</div>
              <div className={styles.typeText}>h</div>
            </>
          )}
          <>
            <div className={styles.timeText}>{mins}</div>
            <div className={styles.typeText}>m</div>
          </>
        </div>
        <div className={styles.textLabel}>
          Total view time
        </div>
      </div>
    </div>
  );
};
export default ViewTotalTime;
