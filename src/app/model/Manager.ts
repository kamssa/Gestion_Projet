import {Adresse} from './Adresse';
import {Personne} from './personnes';
import {Entreprise} from './Entreprise';

export class Manager extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public adresse ?: Adresse,
              public  type?: string,
              public roles?: [],
              public entreprise?: Entreprise) {
    super(id, version, nom, prenom, email, password, fonction, nomComplet, adresse, type, roles);
  }

}
