import React from 'react';
import styles from './styles.module.sass';
import { Icon, SemanticICONS } from 'semantic-ui-react';

export interface INavLink {
  id?: string;
  text: string;
  url: string;
  icon?: SemanticICONS;
}

export interface INavigationSectionProps {
  title: string;
  links: Array<INavLink>;
}

export const NavigationSection: React.FunctionComponent<INavigationSectionProps> = (
  { title, links }
) => (
  <div className={styles.section}>
    <h5 className={styles.title}>{title}</h5>
    <div className={`${styles.link_list} ${styles.section}`}>
      {links.map(link => (
        <div key={link.id} className={styles.link_line}>
          <a href={link.url}>
            { link.icon && <Icon name={link.icon} className={styles.icon} /> }
            {link.text}
          </a>
        </div>
      ))}
    </div>
  </div>
);
