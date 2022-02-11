import {Entreprise} from './Entreprise';

export class MontantStock {
  constructor(
    public id?: number,
    public version?: number,
    public montant?: number,
    public entreprise?: Entreprise
  ) {
  }
}
