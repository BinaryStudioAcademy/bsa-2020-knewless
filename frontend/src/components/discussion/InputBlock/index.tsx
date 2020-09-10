import styles from './styles.module.sass';
import { Icon } from 'semantic-ui-react';
import GrayOutlineButton from '@components/buttons/GrayOutlineButton';
import React, { useCallback, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export interface IInputBlockProps {
  sendLoading: boolean;
  errorSending: boolean;
  message?: string;
  sendMessage: (text: string) => void;
}

const ENTER_CHAR_CODE = 13;

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

  const handleSend = useCallback(ev => {
    if (inputValid) {
      sendMessage(inputText.trim());
    }
    ev.preventDefault();
  }, [inputText, inputValid]);

  function handleEnterPress(ev) {
    if (ev.charCode === ENTER_CHAR_CODE) {
      if (!ev.shiftKey) {
        handleSend(ev);
      }
    }
  }

  return (
    <div className={styles.container}>
      <TextareaAutosize
        className={styles.input}
        value={inputText}
        placeholder="Leave a comment..."
        onChange={event => setInputText(event.target.value)}
        onKeyPress={handleEnterPress}
        maxRows={3}
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
