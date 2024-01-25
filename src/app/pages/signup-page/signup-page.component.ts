import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {
  form = new FormGroup({
    login: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[а-яА-Яa-zA-Z])(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[@$!%*?&])[а-яА-Яa-zA-Z@$!%*?&]+$/u)
    ]),
    phone: new FormControl<string>('')
  })

  get login() {
    return this.form.controls.login as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  get phone() {
    return this.form.controls.phone as FormControl;
  }

  isDataValid() {
    let is_data_valid = true;
      if (this.login.errors != null) is_data_valid = false;
      if (this.password.errors != null) is_data_valid = false;
      // if (this.login.value == '') is_data_valid = false;
      // if (this.password.value == '') is_data_valid = false;
    return is_data_valid
  }

  signUp() {
    console.log('login: ', this.form.value.login);
    console.log('password: ', this.form.value.password);
    console.log('phone: ', this.form.value.phone);
  }
}
