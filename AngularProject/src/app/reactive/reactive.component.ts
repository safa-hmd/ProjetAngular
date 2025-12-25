import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent {

  login =  new FormControl('', Validators.required);
  pwd = new FormControl('', Validators.required);

  registerForm= new FormGroup({
    login : new FormControl('', [Validators.required,Validators.minLength(5)]),
    pwd : new FormControl('', [Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
    email : new FormControl('',[Validators.required, Validators.email]),
    cin : new FormControl('',[Validators.required,Validators.pattern('^[0-9]{8}$')]),
    telephone : new FormControl('', [Validators.required,Validators.min(8)])
  })

save(){
  console.log(this.login)
  console.log(this.pwd)
}
save2(){
  console.log(this.registerForm)
}

getLogin(){
  return this.registerForm.get('login');
}
}
