import React from 'react';
import { Image } from 'semantic-ui-react';
import image from '@images/login.jpg';
import style from './styles.module.sass';

const AuthImage = () => (
  <div className={style.image_container}>
    <Image src={image} />
  </div>
);

export default AuthImage;
