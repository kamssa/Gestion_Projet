import {Employe} from './Employe';

export class CaisseDetail {
  constructor(
    public id?: number,
    public version?: number,
    public  date?: Date,
    public  designation?: string,
    public  montant?: number,
    public  employe?: Employe
  ) {
  }

}
