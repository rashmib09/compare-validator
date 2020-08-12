import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Component } from '@angular/core';

export function validateControl(
  control: AbstractControl
): ValidationErrors | null {
  if (control) {
    let highscore;
    let medscore;
    let lowscore;
    if (
      control.get('MiddleLimit') &&
      control.get('UpperLimit') &&
      control.get('LowerLimit')
    ) {
      highscore = control.get('UpperLimit').value;
      medscore = control.get('MiddleLimit').value;
      lowscore = control.get('LowerLimit').value;
      if (medscore == null || medscore == '') {
        control.get('MiddleLimit').setErrors({ MLError: true });
      } else if (lowscore >= medscore && medscore >= highscore) {
        control.get('MiddleLimit').setErrors({ MiddleLimitError: true });
      } else {
        control.get('MiddleLimit').setErrors(null);
      }
      if (highscore == null || highscore == '') {
        control.get('UpperLimit').setErrors({ ULError: true });
      } else if (medscore >= highscore || lowscore >= highscore) {
        control.get('UpperLimit').setErrors({ UpperLimitError: true });
      } else {
        control.get('UpperLimit').setErrors(null);
      }
      if (highscore == null || highscore == '') {
        control.get('LowerLimit').setErrors({ LLError: true });
      } else if (lowscore >= medscore || lowscore >= highscore) {
        control.get('LowerLimit').setErrors({ LowerLimitError: true });
      } else {
        control.get('LowerLimit').setErrors(null);
      }
    }

    return null;
  }
  return null;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  compareForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.compareForm = this.formBuilder.group(
      {
        UpperLimit: new FormControl(''),
        MiddleLimit: new FormControl('', Validators.required),
        LowerLimit: new FormControl(''),
      },
      {
        validators: validateControl,
      }
    );
  }

  get UpperLimit() {
    return this.compareForm.get('UpperLimit');
  }
  get MiddleLimit() {
    return this.compareForm.get('MiddleLimit');
  }
  get LowerLimit() {
    return this.compareForm.get('LowerLimit');
  }

  numberValidate(e) {
    if ([69, 187, 188, 189].includes(e.keyCode)) {
      e.preventDefault();
    }
  }
}
