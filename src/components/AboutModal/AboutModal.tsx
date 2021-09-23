import classNames from 'classnames';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  closeAboutModal,
  isAboutModalOpenSelector,
} from '../../redux/slices/aboutModal';
import github from './github.svg';
import linkedin from './linkedin.svg';
import twitter from './twitter.svg';
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
        <p className={styles.title}>Mapa da Vacina de São Paulo</p>
        <div className={styles.text}>
          <p>
            O Mapa da Vacina mostra, em tempo real, a situação dos postos de
            vacinação contra a COVID-19 na cidade de São Paulo.
          </p>
          <p>
            Os dados são extraídos do site{' '}
            <a
              href='https://deolhonafila.prefeitura.sp.gov.br/'
              target='_blank'
              rel='noreferrer noopener'
            >
              De Olho Na Fila - Vacina Sampa
            </a>
            , atualizados a cada 10 minutos. Com isso, você pode ver com mais
            clareza quais os postos abertos mais próximos de você, quais estão
            com menor fila e quais vacinas são oferecidas em cada um (caso você
            precise da 2a. dose). Basta clicar nos pinos do mapa para verificar.
          </p>
          <p>
            Esta aplicação é um projeto open source. Não é uma realização da
            Prefeitura de São Paulo e não tem nenhum tipo de filiação com ela.
            Também não somos responsáveis pela qualidade dos dados exibidos, que
            são fornecidos e atualizados pela Prefeitura de São Paulo. A posição
            de alguns marcadores pode não ser exata por falta de informação em
            alguns endereços dos postos.
          </p>
          <p className={styles.name}>Criação: Carlos Zanella</p>
          <div className={styles.social}>
            <a
              href='https://github.com/czanella/mapa-vacina'
              target='_blank'
              rel='noreferrer noopener'
            >
              <img src={github} alt='GitHub' />
            </a>
            <a
              href='https://www.linkedin.com/in/carlos-zanella-96438243/'
              target='_blank'
              rel='noreferrer noopener'
            >
              <img src={linkedin} alt='LinkedIn' />
            </a>
            <a
              href='https://twitter.com/cefzanella/'
              target='_blank'
              rel='noreferrer noopener'
            >
              <img src={twitter} alt='Twitter' />
            </a>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onCloseClick} />
      </div>
    </div>
  );
};

export default AboutModal;
