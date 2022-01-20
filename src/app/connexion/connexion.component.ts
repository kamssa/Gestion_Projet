import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Manager} from '../model/Manager';
import {ManagerService} from '../service/manager.service';
import {Employe} from '../model/Employe';
import {Personne} from '../model/personnes';
declare const $: any;
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  managerForm: FormGroup;
  employeForm: FormGroup;
  private returnUrl: string;
  personne: Personne;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  employe: Employe;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private managerService: ManagerService,
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormempl();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// convenience getter for easy access to form fields
  get f() {
    return this.managerForm.controls;
  }
  initForm() {
    this.managerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  initFormempl() {
    this.employeForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if ( navigator.onLine) {
      this.submitted = true;
      const mail = this.managerForm.value.email;
      this.managerService.getPersonneByEmail(mail).subscribe(data => {
        if (data.status === 0){
          const email = data.body.email;
          const password = this.managerForm.value.password;
          // this.loading = true;
         // this.personne = data.body;
          this.loading = true;
          if (data.body.type === 'MANAGER'){
            console.log('verifier');
            let  manager : Manager = {
              email: email,
              password: password,
              type: 'MANAGER'
            };
            this.authService.login(manager).subscribe(res => {
                console.log('resultat manager', res.body);
                if (res){
                  this.router.navigate([this.returnUrl]);

                }

              },
              error => {
                this.error = "email ou mot de passe oublié";
                this.loading = false;
              });
          }
          else if (data.body.type === 'EMPLOYE'){
            console.log('le type est employe');
            let  employe : Employe = {
              email: email,
              password: password,
              type:'EMPLOYE'
            };
            this.authService.login(employe).subscribe(res => {

                if (res){
                  this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                this.error = "email ou mot de passe oublié";
                this.loading = false;
              });
          }
        }else {
          this.error = "Compte non valide !";
        }
      } );
      this.router.navigate(['dashboard']);
    }else {
      this.error = "Pas de connexion internet !";
    }

  }
}
