import React, { useEffect, useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

import styles from '../../containers/PathsPage/styles.module.sass';
import { IPathCardProps, PathCard } from '@components/PathCard';
import { RoleTypes } from '@containers/AppRouter/models/IRole';

export interface IMyPaths {
  myPaths: IPathCardProps[];
  role: string;
  loading: boolean;
}

export const MyPaths: React.FC<IMyPaths> = ({
  myPaths, loading, role
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (role === RoleTypes.AUTHOR) {
      setActiveIndex(1);
    }
  }, [role]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <div className={styles.title_container}>
          <h3 className={`${styles.title} ${styles.wide_container}`}>My Paths <Icon name='dropdown' /></h3>
        </div>
      </Accordion.Title>
      <div className={`${styles.wide_container} ${styles.content_row}`}>
        <div className={styles.courses_container}>
          {
            loading || myPaths.slice(0, 6).map((p, index) => (
              <PathCard
                key={index}
                id={p.id}
                name={p.name}
                logoSrc={p.logoSrc}
                courses={p.courses}
                duration={p.duration}
              />
            ))}
        </div>
      </div>
      {
        myPaths.length > 6 && (
          <Accordion.Content active={activeIndex === 1}>
            <div className={`${styles.wide_container}`}>
              <div className={styles.courses_container}>
                {
                  loading || myPaths.slice(6, myPaths.length).map((p, index) => (
                    <PathCard
                      key={index}
                      id={p.id}
                      name={p.name}
                      logoSrc={p.logoSrc}
                      courses={p.courses}
                      duration={p.duration}
                    />
                  ))}
              </div>
            </div>
          </Accordion.Content>
        )
      }
    </Accordion>
  )
}
