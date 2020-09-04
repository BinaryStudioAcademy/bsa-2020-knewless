import { PopupProps } from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { Popup } from 'semantic-ui-react';
import styles from './styles.module.sass';
import React from 'react';

export const DarkPopup: React.FC<PopupProps> = props => (
  <Popup
    closeOnTriggerBlur={false}
    closeOnTriggerClick={false}
    hoverable
    position="top center"
    basic
    hideOnScroll
    mouseEnterDelay={600}
    mouseLeaveDelay={100}
    id={styles.popup}
    {...props}
  />
);
