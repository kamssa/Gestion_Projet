
import {Journalier} from './Journalier';

export class DetailMainOeuvre {
  constructor(public id?: number,
              public version?: number,
              public salaire?: number,
              public montantVerser?: number,
              public reste?: number,
              public nbreJours?: number,
              public date?: Date,
              public travauxId?: number,
              public  journalier?: Journalier) {
  }
}
