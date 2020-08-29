import React, { FC } from 'react';
import { Modal, ModalContent } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.sass';

interface IOverviewModalProps {
  isOpen: boolean;
  data: string;
  onClose: Function;
}

const OverviewModal: FC<IOverviewModalProps> = ({ isOpen, data, onClose }) => (
  <Modal size="small" open={isOpen} onClose={() => onClose()}>
    <ModalContent>
      <div>
        <ReactMarkdown className={styles.overview_container} source={data} />
      </div>
    </ModalContent>
  </Modal>
);

export default OverviewModal;
