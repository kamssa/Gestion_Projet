export class DetailAutreAchatTravaux {
  constructor(public id?: number,
              public version?: number,
              public libelleMateriaux?: string,
              public unite?: string,
              public quantite?: number,
              public prixUnitaire?: number,
              public frais?: number,
              public montant?: number,
              public fournisseur?: number,
              public  date?: Date,
              public  travauxId?: number


) {
  }
}
