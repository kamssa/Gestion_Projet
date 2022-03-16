import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Employe} from '../../model/Employe';
import {Departement} from '../../model/Departement';
import {EmployeService} from '../../service/employe.service';
import {AuthService} from '../../service/auth.service';
import {ManagerService} from '../../service/manager.service';
import {NotificationService} from '../../helper/notification.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RoleService} from '../../service/role.service';
import {Role} from '../../model/Role';

@Component({
  selector: 'app-employe-permition',
  templateUrl: './employe-permition.component.html',
  styleUrls: ['./employe-permition.component.scss']
})
export class EmployePermitionComponent implements OnInit {
  isLinear = false;
  checked = false;
  employeForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode: any;
  error = '';
  checkbox = false;
  employe: Employe;
  personne: any;
  array: any;
  roles: any;
  role: Role;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  departements: Departement[];
  departement: Departement;
  constructor(public fb: FormBuilder,
              public  employeService: EmployeService,
              public authService: AuthService,
              private managerService: ManagerService,
              private roleService: RoleService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<EmployePermitionComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              private  helper: JwtHelperService) {


  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      console.log(decoded.sub);
      this.managerService.getPersonneById(decoded.sub).subscribe(result => {
        this.personne = result.body;
        console.log(this.personne);
        this.roleService.getAllRole().subscribe(res => {
          console.log(res);
          this.roles = res.body;
          console.log(this.roles);
        }, error => {
          console.log(error.message);
        });
      }, error => {
        console.log(error.message);
      } );

    }


  }

  onSubmit(): void{

    if (this.employeService.form.get('id').value){
   this.employeService.getEmployeById(this.employeService.form.get('id').value)
  .subscribe(data =>{
    if(data.status === 0){
      this.departement = data.body.departement;
      console.log('getemploye ', this.departement);
      this.employe = {
        id: data.body.id,
        version: data.body.version,
        nom: data.body.nom,
        prenom: data.body.prenom,
        email: data.body.email,
        password: data.body.password,
        activated: data.body.activated,
        departement: this.departement,
        type:'EMPLOYE'
      };
    }
    //console.log('employe', this.employe);
   // console.log('role', this.role);
    this.employeService.addRoleToEmploye(this.employe.id, this.role.id).subscribe(result => {
      console.log(result);
      if(result.status === 0){
        this.notificationService.success('Modifié avec succès');
      }
    });

  });


    }


      this.employeService.form.reset();
      this.employeService.initializeFormGroup();
    this.onClose();
    }




  onClose() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    // this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
    // this.initialCode = obj.s.dialCode;
    console.log(this.initialCode);
  }
  greetDep(event) {

    console.log('Voir le select', event.value);
    this.roleService.getRoleById(event.value).subscribe(data => {
      this.role = data.body;
      console.log('valeur de retour de role', this.role);
    });

  }
}
