import { IVaccinePoint } from '../../types';

import styles from './VaccinePointBox.module.scss';

interface IVaccinePointBoxProps {
  data: IVaccinePoint;
}

const queueColors: Record<string, string> = {
  'SEM FILA': '#32CD32',
  'FILA GRANDE': '#B22222',
  'FILA MÉDIA': '#FF4500',
  'FILA PEQUENA': '#FFD700',
  'AGUARDANDO ABASTECIMENTO 1ª DOSE': '#363636',
  'NÃO FUNCIONANDO': '#4B0082',
};

const VaccinePointBox = ({
  data: { equipamento, endereco, tipo_posto, status_fila },
}: IVaccinePointBoxProps) => (
  <div
    className={styles.vaccinePointBox}
    style={{ borderColor: queueColors[status_fila] ?? '#000' }}
  >
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
