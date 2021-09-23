import { IVaccine, IVaccinePoint } from '../../types';
import waze from './waze.png';

import styles from './VaccinePointBox.module.scss';
import { visitParameterList } from 'typescript';

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

const vaccineNames: Record<IVaccine, string> = {
  astrazeneca: 'AstraZeneca',
  coronavac: 'CoronaVac',
  pfizer: 'Pfizer',
  intercambialidade: 'Pfizer para substituir AstraZeneca',
};

const VaccinePointBox = ({
  data: {
    equipamento,
    endereco,
    tipo_posto,
    status_fila,
    posicao,
    vacinas,
    data_hora,
  },
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
    <p>
      Vacinas:{' '}
      <span className={styles.content}>
        {vacinas.length
          ? vacinas.map((v) => vaccineNames[v]).join(', ')
          : 'Nenhuma'}
      </span>
    </p>
    <p>
      Data e hora da última atualização:{' '}
      <span className={styles.content}>
        {new Date(data_hora).toLocaleString('pt-BR')}
      </span>
    </p>
    <a
      href={`https://www.waze.com/ul?ll=${posicao.lat}%2C${posicao.lng}&navigate=yes&zoom=10`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={waze} className={styles.wazeIcon} alt='Navegar com Waze' />
    </a>
  </div>
);

export default VaccinePointBox;
