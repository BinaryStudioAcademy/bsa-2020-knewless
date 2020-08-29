import React from 'react';
import styles from './styles.module.sass';
import { convertFromSeconds } from '@screens/Favourites/services/helper';
import { IPath } from '@screens/Favourites/models/IPath';
import { history } from '@helpers/history.helper';
import { Label, Icon } from 'semantic-ui-react';

interface IPathRowProps {
  path: IPath;
  remove: (id: string) => void
}

export const PathRow: React.FunctionComponent<IPathRowProps> = ({
  path, remove
}) => {
  const redirectToPath = () => {
    history.push(`/path/${path.id}`);
  }
  return (
    <div className={styles.row}>
      <div onClick={() => redirectToPath()} className={styles.gridrow}>
        <div className={styles.image_item}>
          <img className={styles.path_image} src={path.image}/>
        </div>
        <div className={styles.content_name}>{path.name}</div>
        <div className={styles.content_item}>{path.author}</div>
        <div className={styles.color_item}>{path.courses}</div>
        <div className={styles.content_item}>{convertFromSeconds(path.duration)}</div>
      </div>
      <div className={styles.icon_wrp}>
        <Label
          basic
          size="tiny"
          as="a"
          className={styles.toolBarIcon}
          onClick={() => remove(path.id)}
        >
          <Icon name="minus" size="large" inverted />
        </Label>
      </div>
    </div>
  );
};

