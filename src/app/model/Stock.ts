import {Entreprise} from './Entreprise';

import {DetailStock} from './DetailStock';

export class Stock {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public  date?: Date,
              public  montant?: number,
              public entreprise?: Entreprise,
              public detailStock?: DetailStock[],
  ) {
  }
}
