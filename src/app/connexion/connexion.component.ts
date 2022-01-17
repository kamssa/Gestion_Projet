import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {User} from '../model/User';
declare const $: any;
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  submitted = false;
  loading = false;
  error = '';
  result: any;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isuAth: boolean;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
// convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  initForm() {
    this.form = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.loading = true;
    const  user = new User(null,null,'','', email, password, "ADMIN");
    this.authService.login(user).subscribe(data => {
        if (data.body){
          this.snackBar.open('Succès de la connexion!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,

          });
          this.isuAth = true;
          console.log('auth reussi');
        }else {
          this.isuAth = false;
        }
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = "email ou mot de passe oublié";
        this.loading = false;
      });
    this.router.navigate(['dashboard']);
  }


}
