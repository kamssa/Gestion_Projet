import {Categorie} from './Categorie';

export class Materiel {
  constructor(public id?: number,
              public version?: number,
              public  libelle?: string,
              public  description?: string,
              public unite?: string,
              public prixUnitaire?: number,
              public categorie?: Categorie
             ) {
  }
}
