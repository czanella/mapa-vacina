import classNames from 'classnames';

import styles from './ErrorMessage.module.scss';

interface IErrorMessageProps {
  className?: string;
  message: string;
}

const ErrorMessage = ({ className, message }: IErrorMessageProps) => (
  <div className={classNames(styles.errorMessage, className)}>
    <svg className={styles.icon} version='1.1' viewBox='0 0 512 512'>
      <path d='m507.641,431.876l-224-384.002c-5.734-9.828-16.258-15.875-27.641-15.875-11.383,0-21.906,6.047-27.641,15.875l-224,384.002c-5.773,9.898-5.813,22.125-0.109,32.063 5.711,9.938 16.289,16.063 27.75,16.063h448.001c11.461,0 22.039-6.125 27.75-16.063 5.703-9.938 5.664-22.165-0.11-32.063zm-251.641-15.878c-17.656,0-32-14.328-32-32 0-17.672 14.344-32 32-32 17.688,0 32,14.328 32,32 0,17.671-14.312,32-32,32zm32-127.998c0,17.672-14.328,32-32,32s-32-14.328-32-32v-96c0-17.672 14.328-32 32-32s32,14.328 32,32v96z' />
    </svg>
    <div className={styles.message}>{message}</div>
  </div>
);

export default ErrorMessage;
