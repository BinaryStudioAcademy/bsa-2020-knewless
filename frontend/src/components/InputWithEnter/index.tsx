import { Input } from 'semantic-ui-react';
import { InputProps } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import React, { useCallback } from 'react';

export interface IInputWithEnterProps extends InputProps {
  onEnter: () => void;
}

const ENTER_CHAR_CODE = 13;

export const InputWithEnter: React.FC<IInputWithEnterProps> = props => {
  const { onEnter } = props;

  const handleEnterPress = useCallback(ev => {
    if (ev.charCode === ENTER_CHAR_CODE) {
      onEnter();
    }
  }, [onEnter]);

  return (
    <Input {...props} onKeyPress={handleEnterPress} />
  );
};
