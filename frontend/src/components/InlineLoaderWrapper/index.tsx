import React from 'react';
import { Loader } from 'semantic-ui-react';

export interface IInlineLoaderProps {
  loading: boolean;
  centered: boolean;
}

export const InlineLoaderWrapper: React.FunctionComponent<IInlineLoaderProps> = ({
  loading, centered = false, children
}) => (
  <>
    <Loader active={loading} inline={centered ? 'centered' : true} />
    {children}
  </>
);
