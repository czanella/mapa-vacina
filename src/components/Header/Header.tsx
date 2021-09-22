import question from './question.png';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.menu} />
      <div className={styles.title}>Mapa da Vacina</div>
      <img alt='About' className={styles.about} src={question} role='button' />
    </div>
  );
};

export default Header;
