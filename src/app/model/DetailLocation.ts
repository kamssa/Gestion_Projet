import {Materiaux} from "./Materiaux";
import {Fournisseur} from "./Fournisseur";
export class DetailLocation {
  constructor(
    public id?: number,
    public version?: number,
    public montant?: number,
    public date?: number,
    public materiaux?: Materiaux,
    public  fournisseur?: Fournisseur,
    public travauxId?: number
  ) {
  }
}
