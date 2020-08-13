import React, { useCallback } from 'react';
import styles from './styles.module.sass';
import { Button, Label, Icon } from 'semantic-ui-react';
import { timeHandler } from './helper';

export interface ICoursePreviewProps {
  image: string;
  lecturesNumber: number;
  durationMinutes: number;
  description: string;
  name: string;
  level: string;
  flag?: boolean;
  action?: (any) => void;
}

export const CoursePreview: React.FC<ICoursePreviewProps> = ({
  image, lecturesNumber, durationMinutes, level, flag, action, name, description
}) => {
  const optionalIcon = (isSelected: boolean) => {
    switch (isSelected) {
      case true:
        return (
          <Label basic size="big" className={styles.toolBarIcon} onClick={action}>
            <Icon className={styles.addIcon} name="delete" size="large" inverted color="pink" />
          </Label>
        );
      case false:
        return (
          <Label basic size="big" className={styles.toolBarIcon} onClick={action}>
            <Icon className={styles.addIcon} name="check" size="large" inverted color="green" />
          </Label>
        );
      case undefined:
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.meta__image}>
        {flag !== undefined ? <img src={image} alt="" className={styles.inactive_avatar} />
          : (
            <div className={styles.uploadWrapper}>
              <img src={image} alt="" className={styles.avatar} />
              <Button as="label" className={styles.uploader}>
                upload...
                <input name="image" type="file" onChange={e => action(e.target.files[0])} hidden />
              </Button>
            </div>
          )}
      </div>
      <div className={styles.grid_row_flex}>
        <div className={styles.bottomflex}>
          <div>
            <span className={styles.meta__lectures}>lectures:</span>
            <span className={styles.number}>{lecturesNumber}</span>
          </div>
          <div>
            <span className={styles.meta__lectures}>minutes:</span>
            <span className={styles.number}>{durationMinutes}</span>
          </div>
        </div>
      </div>
      <div className={styles.grid_top_row_flex}>
        <div className={styles.levelText}>
          {level}
        </div>
      </div>
      <div className={styles.course_name}>
        <span className={styles.nameText}>
          {name.length > 19 ? name.substring(0, 18) : name}
        </span>
      </div>
      <div className={styles.description}>
        <span className={styles.description_text}>
          {description === '' ? 'Fill in the fields with information about your course' : description}
        </span>
      </div>
      <div className={styles.optional_element}>
        {optionalIcon(flag)}
      </div>
    </div>
  );
};
