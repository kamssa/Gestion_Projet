import {Employe} from './Employe';

export class DetailAutres {
  constructor(public id?: number,
              public version?: number,
              public date?: Date,
              public designation?: string,
              public  prixUnitaire?: number,
              public  quantite?: number,
              public montant?: number,
              public employe?: Employe
              ) {
  }
}
