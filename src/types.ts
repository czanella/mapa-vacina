export type IVaccine =
  | 'coronavac'
  | 'pfizer'
  | 'astrazeneca'
  | 'intercambialidade'
  | 'janssen'
  | 'influenza'
  | 'pfizer_ped'
  | 'corona_ped';

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
