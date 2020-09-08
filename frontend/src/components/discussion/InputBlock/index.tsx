import styles from './styles.module.sass';
import { Icon } from 'semantic-ui-react';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import React, { useCallback, useEffect, useState } from 'react';
import { InputWithEnter } from '@components/InputWithEnter';

export interface IInputBlockProps {
  sendLoading: boolean;
  errorSending: boolean;
  message?: string;
  sendMessage: (text: string) => void;
}

export const InputBlock: React.FC<IInputBlockProps> = (
  { sendLoading, message, sendMessage, errorSending }
) => {
  const [inputText, setInputText] = useState<string>(message);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    setInputText(message);
  }, [message]);

  useEffect(() => {
    if (!sendLoading && !errorSending) {
      setInputText('');
    }
  }, [sendLoading, errorSending]);

  useEffect(() => {
    setInputValid(inputText !== undefined && inputText.trim() !== '');
  }, [inputText]);

  const handleSend = useCallback(() => {
    if (inputValid) {
      sendMessage(inputText);
    }
  }, [inputText]);

  return (
    <div className={styles.container}>
      <InputWithEnter
        className={styles.input}
        fluid
        value={inputText}
        placeholder="Leave a comment..."
        onChange={(event, { value }) => setInputText(value)}
        onEnter={handleSend}
      />
      <GrayOutlineButton
        className={styles.send_button}
        loading={sendLoading}
        onClick={handleSend}
        disabled={!inputValid}
      >
        <Icon name="send" />
      </GrayOutlineButton>
    </div>
  );
};
