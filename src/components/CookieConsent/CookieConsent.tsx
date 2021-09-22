import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  acceptCookies,
  hasCookieConsentSelector,
  rejectCookies,
} from '../../redux/slices/cookieConsent';
import styles from './CookieConsent.module.scss';

const CookieConsent = () => {
  const hasConsent = useAppSelector(hasCookieConsentSelector);
  const dispatch = useAppDispatch();

  const onOkClick = useCallback(() => {
    dispatch(acceptCookies());
  }, [dispatch]);

  const onNotOkClick = useCallback(() => {
    dispatch(rejectCookies());
  }, [dispatch]);

  if (hasConsent !== undefined) {
    return null;
  }

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.content}>
        Este site usa cookies para computar estatísticas de acesso. Nenhuma
        informação pessoal é coletada e/ou armazenada (incluindo localização).
      </div>
      <div className={styles.buttons}>
        <button className={styles.ok} onClick={onOkClick}>
          Autorizo o uso de cookies
        </button>
        <button className={styles.notOk} onClick={onNotOkClick}>
          Não autorizo o uso de cookies
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
