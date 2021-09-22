import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
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
      <button className={styles.aboutButton} onClick={onAboutClick} />
    </div>
  );
};

export default Header;
