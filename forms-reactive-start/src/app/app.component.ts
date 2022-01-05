import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  minLen = 5;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.userNameCustomValidation.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    // this.signUpForm.valueChanges.subscribe((changes) => {
    //   console.log(changes)
    // })

    this.signUpForm.statusChanges.subscribe((changes) => {
      console.log(changes)
    })

    // this.signUpForm.setValue({
    //   'userData': {
    //     'username': 'Mahir',
    //     'email': 'mahir2cool@gmail.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // })

    this.signUpForm.patchValue({
      'userData': {
        'username': 'Mahir',
      },
    })
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({'gender':'male'})
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getHobbiesControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  userNameCustomValidation(control: FormControl): { [s: string]: boolean } {
    if (control.value && (control.value.length < this.minLen))
      return {'nameLengthNotFulfilled': true};
    else
      return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }
}
