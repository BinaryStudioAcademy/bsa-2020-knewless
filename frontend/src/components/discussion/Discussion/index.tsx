import React, { useEffect } from 'react';
import { DiscussionBlock, IDiscussionBlockProps } from '@components/discussion/DiscussionBlock';
import { IBindingAction } from '@models/Callbacks';

export interface IDiscussionProps extends IDiscussionBlockProps {
  fetchMessages: IBindingAction;
}

export const Discussion: React.FunctionComponent<IDiscussionProps> = props => {
  const { fetchMessages } = props;

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <DiscussionBlock {...props} />
  );
};

export default Discussion;
