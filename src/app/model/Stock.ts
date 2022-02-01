import {Categorie} from './Categorie';
import {Materiel} from './Materiel';
import {Entreprise} from './Entreprise';
import {MontantStock} from './MontantStock';

export class Stock {
  constructor(public id?: number,
              public version?: number,
              public  materiel?: Materiel,
              public  quantite?: number,
              public prix?: number,
              public prixTotal?: number,
              public entreprise?: Entreprise,
              public montantStock?: MontantStock
  ) {
  }
}
