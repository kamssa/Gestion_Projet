import {Entreprise} from './Entreprise';

import {DetailStock} from './DetailStock';

export class Stock {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public  prixUnitaire?: number,
              public quantite?: number,
              public frais?: number,
              public date?: Date,
              public  montant?: number,
              public entreprise?: Entreprise,
              public detailStock?: DetailStock[],
  ) {
  }
}
