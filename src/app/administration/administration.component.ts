import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ManagerService} from '../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Role} from '../model/Role';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  personne: any;
  array: any;
  role: boolean;
  ROLES: any;
  ROLE_NAME: any;

  constructor(private router: Router,
              private managerService: ManagerService,
              private  helper: JwtHelperService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'MANAGER') {
          this.managerService.getManagerById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            console.log(this.personne);
            this.ROLES = this.personne.roles;
            this.ROLES.forEach(r => {
             this.ROLE_NAME = r.name;
             console.log(this.ROLE_NAME);
            });
            console.log(this.ROLES);
            this.role = this.ROLES.includes('ROLE_MANAGER');

          });
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
