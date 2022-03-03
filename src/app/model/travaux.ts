import {Site} from './site';
import {Ville} from './Ville';
import {Client} from './Client';

export class Travaux {
  constructor(public  id?: number,
              public  version?: number,
              public  numeroBon?: string,
              public  accompte?: number,
              public  budget?: number,
              public  reste?: number,
              public  total?: number,
              public  seuil?: number,
              public  date?: Date,
              public  dateLivraison?: Date,
              public site?: Site,
              public ville?: Ville,
              public client?: Client) {
  }
}
