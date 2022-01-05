import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  @ViewChild('formData') formData: NgForm;
  @ViewChild('userData') userData: NgForm;
  defaultQuestion = "pet";
  answer: string = '';
  genders = ['male', 'female'];
  newUser = {
    name: '',
    email: '',
    question: '',
    answer: '',
    gender: '',
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    //Approach-1

    // this.formData.setValue({
    //   userData:{
    //     username:suggestedName,
    //     email:"",
    //   },
    //   questionAnswer:'',
    //   secret:'pet',
    //   gender:"male"
    // });

    //Approach-2
    this.formData.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    console.log(this.formData)
    console.log(this.userData)
    console.log(this.newUser)
    this.newUser.name = this.formData.value.userData.username;
    this.newUser.email = this.formData.value.userData.email;
    this.newUser.question = this.formData.value.secret;
    this.newUser.answer = this.formData.value.questionAnswer;
    this.newUser.gender = this.formData.value.gender;
    this.formData.reset();
  }
}
