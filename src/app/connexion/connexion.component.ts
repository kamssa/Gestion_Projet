import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {Manager} from '../model/Manager';
import {ManagerService} from '../service/manager.service';
import {Employe} from '../model/Employe';
import {EmployeService} from '../service/employe.service';
import {Personne} from '../model/Personne';
import {LoginRequest} from '../model/LoginRequest';

declare const $: any;

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  managerForm: FormGroup;
  employeForm: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  loginRequest: LoginRequest;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  test: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private managerService: ManagerService,
    private employeService: EmployeService
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
      emailOrTelephone: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  initFormempl() {
    this.employeForm = this.fb.group({
      emailOrTelephone: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (navigator.onLine) {
      this.submitted = true;
      const mail = this.managerForm.value.emailOrTelephone;

      this.managerService.getPersonneByEmail(mail).subscribe(data => {
        if (data.status === 0) {
          this.loading = true;
          if (data.body.type === 'MANAGER') {
            let request: LoginRequest = {
              emailOrTelephone: this.managerForm.value.emailOrTelephone,
              password: this.managerForm.value.password,
              type: 'MANAGER'
            };
            this.authService.login(request).subscribe(res => {
                console.log(res);
                if (res) {
                  this.router.navigate([this.returnUrl]);

                }

              },
              error => {
                this.error = 'email ou mot de passe oublié';
                this.loading = false;
              });
          } else if (data.body.type === 'EMPLOYE') {
            let request: LoginRequest = {
              emailOrTelephone: this.managerForm.value.emailOrTelephone,
              password: this.managerForm.value.password,
              type: 'EMPLOYE'
            };
            this.authService.login(request).subscribe(res => {

                if (res) {
                  this.router.navigate([this.returnUrl]);
                }
              },
              error => {
                this.error = 'email ou mot de passe oublié';
                this.loading = false;
              });
          }
        } else {
          this.error = 'Compte non valide !';
        }
      });
      this.router.navigate(['dashboard']);
    } else {
      this.error = 'Pas de connexion internet !';
    }

  }

}
