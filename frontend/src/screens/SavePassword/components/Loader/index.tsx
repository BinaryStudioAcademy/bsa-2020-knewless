import { Segment, Dimmer, Image, Loader as UILoader } from 'semantic-ui-react';
import React from 'react';

export const Loader = () => (
  <Segment>
    <Dimmer active>
        <UILoader indeterminate>Validating your link...</UILoader>
    </Dimmer>
    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
);