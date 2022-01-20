import {Departement} from './Departement';
import {Adresse} from './Adresse';

export class Personne {
  constructor(
  public id?: number,
  public version?: number,
  public nom?: string,
  public prenom?: string,
  public email?: string,
  public password?: string,
  public fonction?: string,
  public nomComplet?: string,
  public adresse?: Adresse,
  public type?: string,
  public roles?: []
  ) {
  }
}
