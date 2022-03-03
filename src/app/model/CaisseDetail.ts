import {Employe} from './Employe';

export class CaisseDetail {
  constructor(
    public id?: number,
    public version?: number,
    public date?: Date,
    public designation?: string,
    public  prixUnitaire?: number,
    public  quantite?: number,
    public montant?: number,
    public entrepriseId?: number,
    public employe?: Employe
  ) {
  }

}
