import {Entreprise} from './Entreprise';

export class DetailAticleStockGeneral {
  constructor(public id?: number,
              public version?: number,
              public  libelleMateriaux?: string,
              public  prixUnitaire?: number,
              public quantite?: number,
              public  montant?: number,
              public entreprise?: Entreprise,

  ) {
  }
}
