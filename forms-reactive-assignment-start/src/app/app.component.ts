import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {promise} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished']
  ObjectHelper = Object;
  project = {
    name: '',
    email: '',
    status: '',
  }

  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      // 'name': new FormControl(null, [Validators.required, this.projectNameForbidden]),
      'name': new FormControl(null, [Validators.required], this.projectNameForbiddenAsync),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });

    this.projectForm.patchValue({
      'status': 'Stable'
    });

    this.projectForm.statusChanges.subscribe((stateChange) => console.log(stateChange));
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.project = this.projectForm.value;
  }

  projectNameForbidden(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return {'projectNameForbidden': true};
    } else {
      return null;
    }
  }

  projectNameForbiddenAsync(control: FormControl): Promise<any> | Observable<any> {
    const myPromise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'projectNameForbidden': true});
        } else {
          resolve(null);
        }
      }, 2000)
    });

    return myPromise;
  }
}
