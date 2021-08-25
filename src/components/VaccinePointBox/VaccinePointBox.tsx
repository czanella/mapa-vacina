import { IVaccinePoint } from '../../types';

import styles from './VaccinePointBox.module.scss';

interface IVaccinePointBoxProps {
  data: IVaccinePoint;
}

const VaccinePointBox = ({
  data: { equipamento, endereco, tipo_posto, status_fila },
}: IVaccinePointBoxProps) => (
  <div className={styles.vaccinePointBox}>
    <p>
      <span className={styles.content}>{equipamento}</span>
    </p>
    <p>
      Endreço: <span className={styles.content}>{endereco}</span>
    </p>
    <p>
      Tipo de posto: <span className={styles.content}>{tipo_posto}</span>
    </p>
    <p>
      Status: <span className={styles.content}>{status_fila}</span>
    </p>
  </div>
);

export default VaccinePointBox;
