import {Categorie} from './Categorie';

export class DetailStockHistory {
  constructor(public id?: number,
              public version?: number,
              public libelleMateriaux?: string,
              public  prixUnitaire?: number,
              public  unite?: string,
              public quantite?: number,
              public  montant?: number,
              public frais?: number,
              public  libellefournisseur?: string,
              public categorie?: Categorie,

  ) {
  }
}
