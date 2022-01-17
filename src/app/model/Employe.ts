import {Salaire} from './Salaire';
import {Personne} from './personnes';
import {Departement} from './Departement';

export class Employe extends Personne{
  constructor(
    public id?: number,
    public version?: number,
    public name?: string,
    public username?: '',
    public nom?: string,
    public prenom?: string,
    public  email?: string,
    public telephone?: string,
    public  password?: string,
    public fonction?: string,
    public activated?: '',
    public salaire?: Salaire,
    public type?: string,
    public roles?: [],
    public departement?: Departement) {
  super(id, version,  name, username, email, password, type, roles);
}


}
