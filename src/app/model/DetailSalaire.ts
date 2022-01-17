import {Employe} from './Employe';

export class DetailSalaire {
  constructor(public  id?: number,
              public  version?: number,
              public date?: Date,
              public libelle?: string,
              public montantVerse?: number,
              public reste?: number,
              public employeId?: number) {
  }
}
