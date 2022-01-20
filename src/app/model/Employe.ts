import {Salaire} from './Salaire';
import {Personne} from './personnes';
import {Departement} from './Departement';
import {Adresse} from './Adresse';

export class Employe extends Personne{
  constructor(
    public id ?: number,
    public version?: number,
    public nom ?: string,
    public prenom ?: string,
    public email ?: string,
    public password ?: string,
    public fonction ?: string,
    public nomComplet ?: string,
    public activated?: boolean,
    public departement?: Departement,
    public adresse ?: Adresse,
    public salaire?: Salaire,
    public  type?: string,
    public roles?: []) {
    super(id, version, nom, prenom, email, password, fonction, nomComplet, adresse, type, roles);
  }

}
