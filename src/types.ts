export type IVaccine =
  | 'coronavac'
  | 'pfizer'
  | 'astrazeneca'
  | 'intercambialidade';

export interface IVaccinePoint {
  equipamento: string;
  endereco: string;
  tipo_posto: string;
  status_fila: string;
  data_hora: string;
  posicao: {
    lat: number;
    lng: number;
  };
  vacinas: IVaccine[];
}
