import {Salaire} from './Salaire';
import {Personne} from './personnes';
import {Departement} from './Departement';

export class Employe extends Personne{
  constructor(
    public id?: number,
    public version?: number,
    public  email?: string,
    public telephone?: string,
    public  password?: string,
    public type?: string,
    public roles?: [],
    public nom?: string,
    public prenom?: string,
    public nomComplet?: string,
    public fonction?: string,
    public activated?: '',
    public salaire?: Salaire,

    public departement?: Departement) {
  super(id, version, email, telephone, password, type);
}


}
