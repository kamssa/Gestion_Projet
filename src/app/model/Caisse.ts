import {CaisseDetail} from './CaisseDetail';

export class Caisse {
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public   montant?: number,
    public  actived?: boolean,
    public  caisseDetail?: CaisseDetail[]
) {
  }

}
