import classNames from 'classnames';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  closeAboutModal,
  isAboutModalOpenSelector,
} from '../../redux/slices/aboutModal';
import styles from './AboutModal.module.scss';

const AboutModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isAboutModalOpenSelector);

  const onCloseClick = useCallback(() => {
    dispatch(closeAboutModal());
  }, [dispatch]);

  return (
    <div className={classNames(styles.aboutModal, { [styles.open]: isOpen })}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onCloseClick} />
      </div>
    </div>
  );
};

export default AboutModal;
