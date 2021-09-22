import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import question from './question.png';
import styles from './Header.module.scss';
import { openAboutModal } from '../../redux/slices/aboutModal';

const Header = () => {
  const dispatch = useAppDispatch();

  const onAboutClick = useCallback(() => {
    dispatch(openAboutModal());
  }, [dispatch]);

  return (
    <div className={styles.header}>
      <div className={styles.menu} />
      <div className={styles.title}>Mapa da Vacina</div>
      <img
        alt='About'
        className={styles.about}
        src={question}
        role='button'
        onClick={onAboutClick}
      />
    </div>
  );
};

export default Header;
