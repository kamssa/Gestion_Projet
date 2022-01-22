import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {AuthService} from '../../service/auth.service';
import {Employe} from '../../model/Employe';
import {Manager} from '../../model/Manager';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AdminService} from '../../service/admin.service';
import {ManagerService} from '../../service/manager.service';
import {EmployeService} from '../../service/employe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  personne: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  type: string;
   currentUser: any;
  constructor(location: Location,  private element: ElementRef, private router: Router,
              private authService: AuthService,  private adminService: AdminService,
              private managerService: ManagerService, private employeService: EmployeService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit(){
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
   /* this.currentUser = this.authService.currentUserValue;

    const helper = new JwtHelperService();

    const decoded = helper.decodeToken(this.currentUser.body.body.accessToken);

    this.adminService.getAdminById(decoded.sub).subscribe(result => {

         this.personne = result.body;
         this.type = this.personne.type;
         if (this.type === 'MANAGER'){
         this.managerService.getManagerById(result.body.id).subscribe( res => {
           this.personne = res.body;
           this.nav = true;

         });
         }else if (this.type === 'EMPLOYE'){
           this.employeService.getEmployeById(result.body.id).subscribe(
             res => {
               this.personne = res.body;
               this.nav = false;
             }
           );

         }


      });
*/
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function(){
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      }else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function() {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  }

  getTitle(){
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#'){
      titlee = titlee.slice( 1 );
    }

    for (let item = 0; item < this.listTitles.length; item++){
      if (this.listTitles[item].path === titlee){
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
