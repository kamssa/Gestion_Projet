import {Materiaux} from "./Materiaux";
import {Fournisseur} from "./Fournisseur";

export class DetailAchatTravaux {
  constructor(public id?: number,
              public version?: number,
              public quantite?: number,
              public prix_unitaire?: number,
              public frais?: number,
              public montant?: number,
              public materiaux?: Materiaux,
              public  fournisseur?: Fournisseur) {
  }
}
