import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ManagerService} from '../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  personne: any;
  array: any;
  role: boolean;
  role1: boolean;
  role2: boolean;
  role3: boolean;

  ROLES: any;
  ROLE_NAME: any;
  error = '';
  constructor(private router: Router,
              private managerService: ManagerService,
              private  helper: JwtHelperService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {

        this.personne = resultat.body;
        //console.log(this.personne.id);
        if (this.personne.type === 'EMPLOYE') {
          this.managerService.getPersonneById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            console.log(this.personne);
            this.ROLES = this.personne.roles;
            const names = this.ROLES.map(el => el.name);
            this.role = names.includes("ROLE_ADMINISTRATION");
            this.role1 = names.includes("ROLE_EMPLOYE");
            this.role2 = names.includes("ROLE_TECHNICIEN");
            this.role3 = names.includes("ROLE_COMPTABILITE");
            console.log( this.role);
            console.log( this.role1);
            console.log( this.role2);
            console.log( this.role3);

          });
        }else {
          this.error ='Vous n\'etes pas autorisé';
        }
      });
    }

  }

  retrait() {

  }

  stock() {
    this.router.navigate(['/listDetailStock']);
  }

  openDialog() {
    this.router.navigate(['/etatProjet']);
  }
}
