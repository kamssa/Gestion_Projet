import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Travaux} from "../../model/travaux";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SteTravauxService} from "../../service/ste-travaux.service";
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-edit-tecnique',
  templateUrl: './edit-tecnique.component.html',
  styleUrls: ['./edit-tecnique.component.scss']
})
export class EditTecniqueComponent implements OnInit {
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  travaux: Travaux;
  travauxId: number;
  solde: number;
  total: number;
  panelOpenState = false;
  constructor(private route: ActivatedRoute,
              private travauxService: SteTravauxService, private  router: Router,
              private mediaObserver: MediaObserver) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.travauxService.getTravauxById(+params.get('id')))
    ).subscribe(result => {
      this.travaux = result.body;
      this.travauxId = result.body.id;
    });
  }

  onImage() {
    this.edit = 0;
  }
}
