import React, { useEffect, useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import styles from '../../containers/PathsPage/styles.module.sass';
import { IPathCardProps, PathCard } from '@components/PathCard';
import { RoleTypes } from '@containers/AppRouter/models/IRole';
import { RowPlaceholder } from '@components/placeholder/RowPlaceholder';
import { history } from '@helpers/history.helper';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';

export interface IMyPaths {
  myPaths: IPathCardProps[];
  role: string;
  loading: boolean;
}

export const MyPaths: React.FC<IMyPaths> = ({
  myPaths, loading, role
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const isAuthor = role === RoleTypes.AUTHOR;
  useEffect(() => {
    if (isAuthor) {
      setActiveIndex(1);
    }
  }, [role]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleCreatePathClick = () => history.push('/add_path');

  const noPathsPlaceholder = isAuthor ? (
    <RowPlaceholder
      button={{ text: 'Create first path', onClick: handleCreatePathClick }}
      description="Let's fix it! 🙂"
    />
  ) : <RowPlaceholder description="Just start your first path!" />;

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <div className={styles.title_container}>
          <h3 className={`${styles.title} ${styles.wide_container} ${styles.my_paths_accordion}`}>
            <div>
              My Paths
              <Icon name="dropdown" />
            </div>
            {isAuthor && <GrayOutlineButton content="Create path" onClick={handleCreatePathClick} />}
          </h3>
        </div>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        {loading || myPaths.length > 0 ? (
          <div className={`${styles.wide_container}`}>
            <div className={styles.courses_container}>
              {myPaths.map(p => (
                <PathCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  logoSrc={p.logoSrc}
                  courses={p.courses}
                  duration={p.duration}
                  role={role}
                  released={p.released}
                />
              ))}
            </div>
          </div>
        ) : noPathsPlaceholder}
      </Accordion.Content>
    </Accordion>
  );
};
