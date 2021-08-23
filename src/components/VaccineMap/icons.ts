import { IMapIcon } from '../Maps/types';

import noQueue from './images/noQueue.png';
import largeQueue from './images/largeQueue.png';
import mediumQueue from './images/mediumQueue.png';
import smallQueue from './images/smallQueue.png';
import awaitingSupplies from './images/awaitingSupplies.png';
import closed from './images/closed.png';

const iconGeometry: Record<string, [number, number]> = {
  size: [110, 210],
  origin: [0, 0],
  anchor: [11, 42],
  scaledSize: [22, 42],
};

const icons: Record<string, IMapIcon> = {
  'SEM FILA': {
    url: noQueue,
    ...iconGeometry,
  },
  'FILA GRANDE': {
    url: largeQueue,
    ...iconGeometry,
  },
  'FILA MÉDIA': {
    url: mediumQueue,
    ...iconGeometry,
  },
  'FILA PEQUENA': {
    url: smallQueue,
    ...iconGeometry,
  },
  'AGUARDANDO ABASTECIMENTO 1ª DOSE': {
    url: awaitingSupplies,
    ...iconGeometry,
  },
  'AGUARDANDO ABASTECIMENTO 2ª DOSE': {
    url: awaitingSupplies,
    ...iconGeometry,
  },
  'AGUARDANDO ABASTECIMENTO 1ª e 2ª DOSE': {
    url: awaitingSupplies,
    ...iconGeometry,
  },
  'NÃO FUNCIONANDO': {
    url: closed,
    ...iconGeometry,
  },
};

export default icons;
