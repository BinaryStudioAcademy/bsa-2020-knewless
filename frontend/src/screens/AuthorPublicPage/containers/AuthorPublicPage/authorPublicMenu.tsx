import React from 'react';
import { connect } from 'react-redux';
import { IAuthorData } from 'screens/AuthorPublicPage/models/IAuthorData';
import { Menu, Segment } from 'semantic-ui-react';
import { IBindingCallback1 } from 'models/Callbacks';

import { IAuthorMenu } from '../../models/IAuthorMenu';
import { setAuthorMenuActiveItemRoutine } from 'screens/AuthorPublicPage/routines';
import CoursesList from './authorCoursesList';
import ArticlesList from './authorArticlesList';

export interface IAuthorPublicMenu {
  authorData: IAuthorData;
  setAuthorActiveMenu: IBindingCallback1<IAuthorMenu>;
  authorMenuProps: IAuthorMenu;
}

const AuthorPublicMenu: React.FunctionComponent<IAuthorPublicMenu> = ({
  authorData, setAuthorActiveMenu, authorMenuProps
}) => (
  <div style={{ height: '100%' }}>
    <Menu className="authorMenu" pointing secondary>
      <Menu.Item
        name="Courses"
        className="authorMenuButton"
        active={authorMenuProps.activeItem === 'Courses'}
        onClick={() => setAuthorActiveMenu({ activeItem: 'Courses' })}
      />
      <Menu.Item
        name="Articles"
        className="authorMenuButton"
        active={authorMenuProps.activeItem === 'Articles'}
        onClick={() => setAuthorActiveMenu({ activeItem: 'Articles' })}
      />
    </Menu>
    <Segment className="authorMenuSegment">
      {authorMenuProps.activeItem === 'Courses' ? <CoursesList /> : <ArticlesList />}
    </Segment>

  </div>
);

const mapStateToProps = (state: any) => ({
  authorData: state.authorPublicData.authorData,
  authorMenuProps: state.authorPublicData.authorMenu
});

const mapDispatchToProps = {
  setAuthorActiveMenu: setAuthorMenuActiveItemRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPublicMenu);
