import {Adresse} from "./Adresse";
import {Personne} from "./Personne";
import {Entreprise} from "./Entreprise";
import {Departement} from "./Departement";

export class Manager extends Personne{
  constructor(public id ?: number,
              public version?: number,
              public nom ?: string,
              public prenom ?: string,
              public email ?: string,
              public telephone?: string,
              public password ?: string,
              public fonction ?: string,
              public nomComplet ?: string,
              public departement?: Departement,
              public adresse ?: Adresse,
              public  type?: string,
              public roles?: [],
              public  entreprise?: Entreprise,
              public actevated?: boolean) {
    super(id, version, nom, prenom, email, telephone, password, fonction, nomComplet, departement, adresse, type, roles);
  }

}
