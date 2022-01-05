import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultMailValue = 'username@domain.com'
  subscriptions = ["Basic", "Advanced", "Pro"];
  user = {
    email: '',
    subscription: '',
    password: ''
  }
  @ViewChild('formData')
  formData: NgForm;

  onSubmit() {
    console.log(this.formData);
    this.user.email = this.formData.value.email;
    this.user.password = this.formData.value.password;
    this.user.subscription = this.formData.value.subscription;
  }
}
