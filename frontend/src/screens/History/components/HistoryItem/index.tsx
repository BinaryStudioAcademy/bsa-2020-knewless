import React from 'react';
import { IHistory } from '@screens/History/models/IHistory';
import styles from '../../containers/HistoryPage/styles.module.sass';
import { Icon } from 'semantic-ui-react';
import { CircleProgress } from 'react-gradient-progress';
import { timeComparator } from '@helpers/date.helper';
import imgPlaceholder from '@images/lecture_image_paceholder.png';
import { secondsFormatted } from '@helpers/seconds.helper';

interface IHistoryItemProps {
  historyItem: IHistory;
}

const COMPLETED_THRESHOLD = 0.99;
export const HistoryItem: React.FC<IHistoryItemProps> = ({
  historyItem
}) => {
  const getImage = (path: string) => (path || imgPlaceholder);

  return (
    <div className={styles.table_item}>
      {historyItem.fractionWatched >= COMPLETED_THRESHOLD
        ? (
          <div className={`${styles.collumn} ${styles.image_box}`}>
            <img className={styles.image} src={getImage(historyItem.lecture.previewImage)} alt="" />
            <div className={`${styles.trophy}`}>
              <Icon className={`${styles.collumn} ${styles.text_center} `} name="trophy" />
            </div>
          </div>
        )
        : (
          <img
            className={`${styles.collumn} ${styles.image}`}
            src={getImage(historyItem.lecture.previewImage)}
            alt=""
          />
        )}
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <h4
        className={`${styles.collumn} ${styles.name}`}
        onClick={() => window.open(`/lecture/${historyItem.lecture.id}`)}
      >
        {historyItem.lecture.name}
      </h4>
      <div className={styles.collumn} style={{ color: '#FF8576' }}>
        {historyItem.tags.slice(0, 3).map(t => `${t} `)}
      </div>
      <div className={styles.collumn}>
        {secondsFormatted(historyItem.fractionWatched === 1
          ? historyItem.lecture.duration
          : historyItem.secondsWatched)}
      </div>
      <div className={styles.collumn}>{secondsFormatted(historyItem.lecture.duration)}</div>
      <div className={styles.collumn}>{timeComparator(historyItem.updatedAt)}</div>
      <div className={`${styles.collumn} ${styles.progress}`}>
        <CircleProgress
          percentage={Math.round(historyItem.fractionWatched * 100)}
          width={55}
          strokeWidth={2}
          primaryColor={['#3378BD', '#FF8576']}
          secondaryColor="#121421"
        />
      </div>
    </div>
  );
};
