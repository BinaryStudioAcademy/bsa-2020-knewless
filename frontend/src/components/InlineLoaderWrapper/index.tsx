import React from 'react';
import { Loader } from 'semantic-ui-react';

export interface IInlineLoaderProps {
  loading: boolean;
  centered: boolean;
  className?: string;
}

export const InlineLoaderWrapper: React.FunctionComponent<IInlineLoaderProps> = ({
  loading, centered = false, className, children
}) => (
  <>
    <Loader active={loading} inline={centered ? 'centered' : true} className={className || ''} />
    {children}
  </>
);
