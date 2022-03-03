import {CaisseDetail} from './CaisseDetail';
import {Entreprise} from './Entreprise';

export class Caisse {
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public   montant?: number,
    public  actived?: boolean,
    public entreprise?: Entreprise,
    public  caisseDetail?: CaisseDetail[]
) {
  }

}
