import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';

export class AWMSFormComponent {
  isFormValidationIssues(form: FormGroup, component: string) {
    return (form.controls[component].invalid && (form.controls[component].dirty || form.controls[component].touched));
  }

  formatErrorsIntoSingleMessage(errors: any): string {
    if (_.has(errors, 'required')) {
      return 'This field is required';
    }

    return '';
  }
}
