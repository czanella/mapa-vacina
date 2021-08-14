import noQueue from './images/noQueue.png';
import largeQueue from './images/largeQueue.png';
import mediumQueue from './images/mediumQueue.png';
import smallQueue from './images/smallQueue.png';
import awaitingSupplies from './images/awaitingSupplies.png';
import closed from './images/closed.png';

const icons: Record<string, string> = {
  'SEM FILA': noQueue,
  'FILA GRANDE': largeQueue,
  'FILA MÉDIA': mediumQueue,
  'FILA PEQUENA': smallQueue,
  'AGUARDANDO ABASTECIMENTO 1ª DOSE': awaitingSupplies,
  'AGUARDANDO ABASTECIMENTO 2ª DOSE': awaitingSupplies,
  'AGUARDANDO ABASTECIMENTO 1ª e 2ª DOSE': awaitingSupplies,
  'NÃO FUNCIONANDO': closed,
};

export default icons;
