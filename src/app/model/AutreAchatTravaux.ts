import {DetailAchatTravaux} from './DtailAchat';
import {DetailAutreAchatTravaux} from './DetailAutreAchatTravaux';

export class AutreAchatTravaux {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public date?: Date,
              public montant?: number,
              public travauxId?: number,
              public detailAutreAchatTravaux?: DetailAutreAchatTravaux[]) {
  }
}
