import {Banque} from './Banque';

export class Operation {
  constructor(public id?: string,
              public version?: string,
              public date?: Date,
              public libelle?: string,
              public montant?: number,
              public  motif?: string,
              public banque?: Banque
              ) {
  }
}
