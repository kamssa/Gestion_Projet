import { Component, OnInit } from '@angular/core';
import {ConnexionComponent} from '../../connexion/connexion.component';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'Profile',  icon:'person', class: '' },
  { path: '/finance', title: 'Gestion Financière',  icon:'content_paste', class: '' },
  { path: '/technique', title: 'Gestion Technique',  icon:'library_books', class: '' },
  { path: '/banque', title: 'Gestion Banque',  icon:'bubble_chart', class: '' },
  { path: '/salaire', title: 'Salaire',  icon:'bubble_chart', class: '' },
  { path: '/Mis à jour', title: 'Kamssa Group pro',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
