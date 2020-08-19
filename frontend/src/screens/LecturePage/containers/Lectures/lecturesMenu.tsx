import React from 'react';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react';

import { IBindingCallback1 } from 'models/Callbacks';
import { ILecturesMenu } from '../../models/ILecturesMenu';
import { setMenuActiveItemRoutine } from '../../routines';
import LecturesList from './lecturesList';

import './styles.sass';

export interface ILecturesMenuProps {
  menuProps: ILecturesMenu;
  setMenu: IBindingCallback1<ILecturesMenu>;
  setChosenVideo: Function;
}

const LecturesMenu: React.FunctionComponent<ILecturesMenuProps> = ({
  menuProps, setMenu, setChosenVideo
}) => (
  <div style={{ height: '100%' }}>
    <Menu className="lecturesMenu" pointing secondary widths="2">
      <Menu.Item
        name="Lectures"
        className="lecturesButtonStyle"
        active={menuProps.lecturesMenuActiveItem === 'Lectures'}
        onClick={() => setMenu({ lecturesMenuActiveItem: 'Lectures' })}
      />
      <Menu.Item
        name="Discussions"
        active={menuProps.lecturesMenuActiveItem === 'Disscussions'}
        onClick={() => setMenu({ lecturesMenuActiveItem: 'Disscussions' })}
      />
    </Menu>
    <Segment className="segmentStyle">
      {menuProps.lecturesMenuActiveItem === 'Lectures'
        ? <LecturesList setChosenVideo={setChosenVideo} /> : 'Discussions' }
    </Segment>
  </div>
);

const mapStateToProps = (state: any) => ({
  menuProps: state.lecturePage.lectureMenu
});

const mapDispatchToProps = {
  setMenu: setMenuActiveItemRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LecturesMenu);
