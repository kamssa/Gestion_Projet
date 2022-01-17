import {Fournisseur} from "./Fournisseur";
import {Employe} from "./Employe";
import {Journalier} from './Journalier';

export class DetailMainOeuvre {
  constructor(public id?: number,
              public version?: number,
              public salaire?: number,
              public montantVerser?: number,
              public reste?: number,
              public  journalier?: Journalier) {
  }
}
