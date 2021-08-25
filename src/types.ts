export interface IVaccinationEquipment {
  equipamento: string;
  endereco: string;
  tipo_posto: string;
  status_fila: string;
  posicao: {
    lat: number;
    lng: number;
  };
}
