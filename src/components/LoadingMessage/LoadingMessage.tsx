import classNames from 'classnames';
import Spinner from '../Spinner';

import styles from './LoadingMessage.module.scss';

interface ILoadingMessageProps {
  className?: string;
  message?: string;
}

const LoadingMessage = ({ className, message }: ILoadingMessageProps) => (
  <div className={classNames(styles.loadingMessage, className)}>
    <Spinner />
    {message ? <div className={styles.message}>{message}</div> : null}
  </div>
);

export default LoadingMessage;
