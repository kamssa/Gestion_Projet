import {Materiel} from './Materiel';

export class Categorie {
  constructor(public id?: number,
              public version?: number,
              public  libelle?: string,
              public description?: string,
              public  idEntreprise?: number,
              public materiel?: Materiel[]) {
  }
}
