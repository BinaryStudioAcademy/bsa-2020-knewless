import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import styles from './styles.module.sass';
import { fetchHistoryRoutine } from '@screens/History/routines';
import { IHistory } from '@screens/History/models/IHistory';
import { IBindingAction } from '@models/Callbacks';
import { HistoryItem } from '@screens/History/components/HistoryItem';

export interface IHistoryPageProps {
  history: IHistory[],
  loading: boolean,
  fetchHistory: IBindingAction

}

const HistoryPage: React.FC<IHistoryPageProps> = ({
  history, loading, fetchHistory
}) => {

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className={styles.history_content}>
      <div className={styles.title_container}>
        <h3 className={`${styles.title} ${styles.wide_container}`}>History</h3>
      </div>
      {!loading && (
          <div className={styles.wide_container}>
            <div className={styles.table_title}>
              <div></div>
              <div>TITLE</div>
              <div>TAGS</div>
              <div>VIEW TIME</div>
              <div>DURATION</div>
              <div>LAST VIEWED</div>
              <div className={styles.text_center} >COMPLETION %</div>
            </div>
            <div className={styles.table_content}>
              {history && history.map(h => (
                <HistoryItem key={h.id} historyItem={h} />
              ))}
            </div>
          </div>
        )
      }

    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  history: state.historyPage.data.history,
  loading: state.historyPage.requests.dataRequest.loading
});

const mapDispatchToProps = {
  fetchHistory: fetchHistoryRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
