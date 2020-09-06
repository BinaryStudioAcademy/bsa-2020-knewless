import React, { useEffect } from 'react';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import { connect } from 'react-redux';
import { IAppState } from '@models/AppState';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchAuthorRoutine, fetchStudentRoutine } from '@containers/UserOverview/routines';
import {
  extractAuthor,
  extractLoading,
  extractStudent,
  IBriefAuthorInfo,
  IBriefStudentInfo
} from '@containers/UserOverview/model';
import { InlineLoaderWrapper } from '@components/InlineLoaderWrapper';
import { StudentOverview } from '@components/discussion/overview/StudentOverview';
import { AuthorOverview } from '@components/discussion/overview/AuthorOverview';
import styles from './styles.module.sass';

export interface IUserOverviewProps {
  userId: string;
  role: RoleTypes;
  loadStudent?: IBindingCallback1<string>;
  loadAuthor?: IBindingCallback1<string>;
  author?: IBriefAuthorInfo;
  student?: IBriefStudentInfo;
  loading?: boolean;
}

export const UserOverview: React.FC<IUserOverviewProps> = (
  { userId, role, loadAuthor, loadStudent, student, author, loading }
) => {
  useEffect(() => {
    switch (role) {
      case RoleTypes.USER:
        loadStudent(userId);
        break;
      case RoleTypes.AUTHOR:
        loadAuthor(userId);
        break;
      default:
        break;
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <InlineLoaderWrapper loading={loading} centered>
        {student && <StudentOverview student={student} />}
        {author && <AuthorOverview author={author} />}
        {!student && !author && (<span>Failed to load data</span>)}
      </InlineLoaderWrapper>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  author: extractAuthor(state),
  student: extractStudent(state),
  loading: extractLoading(state)
});

const mapDispatchToProps = {
  loadStudent: fetchStudentRoutine,
  loadAuthor: fetchAuthorRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
