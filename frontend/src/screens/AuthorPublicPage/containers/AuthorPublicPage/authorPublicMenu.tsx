import React from 'react';
import { connect } from 'react-redux';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { Menu, Segment } from 'semantic-ui-react';
import { IBindingCallback1 } from 'models/Callbacks';
import { IAuthorMenu } from '../../models/IAuthorMenu';
import { setAuthorMenuActiveItemRoutine } from 'screens/AuthorPublicPage/routines';
import CoursesList from './authorCoursesList';
import ArticlesList from './authorArticlesList';
import styles from './styles.module.sass';

export interface IAuthorPublicMenu {
  authorData: IAuthorData;
  setAuthorActiveMenu: IBindingCallback1<IAuthorMenu>;
  authorMenuProps: IAuthorMenu;
}

const AuthorPublicMenu: React.FunctionComponent<IAuthorPublicMenu> = ({
  authorData, setAuthorActiveMenu, authorMenuProps
}) => (
  <>
    <Menu className={styles.authorMenu} pointing secondary>
      <Menu.Item
        className={styles.authorMenuButton}
        active={authorMenuProps.activeItem === 'Courses'}
        onClick={() => setAuthorActiveMenu({ activeItem: 'Courses' })}
      >
        <span>Courses</span>
      </Menu.Item>
      <Menu.Item
        className={styles.authorMenuButton}
        active={authorMenuProps.activeItem === 'Articles'}
        onClick={() => setAuthorActiveMenu({ activeItem: 'Articles' })}
      >
        <span>Articles</span>
      </Menu.Item>
    </Menu>
    <Segment className={styles.authorMenuSegment}>
      {authorMenuProps.activeItem === 'Courses' ? <CoursesList authorData={authorData} /> : <ArticlesList />}
    </Segment>
  </>
);

const mapStateToProps = (state: any) => ({
  authorData: state.authorPublicData.authorData,
  authorMenuProps: state.authorPublicData.authorMenu
});

const mapDispatchToProps = {
  setAuthorActiveMenu: setAuthorMenuActiveItemRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPublicMenu);
