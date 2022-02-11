import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  edit: number;

  constructor() { }

  ngOnInit(): void {
  }

  retrait() {

  }

  banque() {

  }

  openDialog() {
 this.edit = 1;
  }

  openChantier() {
    this.edit = 0;
  }
}
