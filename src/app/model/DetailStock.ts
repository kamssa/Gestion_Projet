import {Entreprise} from './Entreprise';
import {Materiaux} from './Materiaux';
import {Categorie} from './Categorie';
import {Fournisseur} from './Fournisseur';

export class DetailStock {
  constructor(public id?: number,
              public version?: number,
              public libelleMateriaux?: string,
              public  prixUnitaire?: number,
              public  unite?: string,
              public quantite?: number,
              public  montant?: number,
              public frais?: number,
              public categorie?: Categorie,
              public  fournisseur?: Fournisseur
  ) {
  }
}
