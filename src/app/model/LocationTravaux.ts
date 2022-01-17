import {DetailLocation} from "./DetailLocation";

export  class LocationTravaux {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public date?: Date,
              public travauxId?: number,
              public detailLocation?: DetailLocation[]) {
  }
}
