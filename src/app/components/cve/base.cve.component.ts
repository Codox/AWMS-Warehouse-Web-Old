import {FormArray, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {CVEMode} from '../../shared/cve-mode';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {AWMSConfirmationDialogueComponent} from '../awms/awms-confirmation-dialogue.component';

@Component({
  selector: 'ngx-base-cve-component',
  template: '',
})
export abstract class BaseCVEComponent implements OnInit {
  form: FormGroup;
  mode: CVEMode;

  setForm(form: FormGroup): void {
    this.form = form;
  }

  getForm(): FormGroup {
    return this.form;
  }

  ngOnInit(): void {
  }

  markControlsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markControlsAsTouched(control);
      }
    });
  }

  enableForm(): void {
    Object.values(this.getForm().controls).forEach(control => {
      control.enable();
    });
  }

  disableForm(): void {
    Object.values(this.getForm().controls).forEach(control => {
      control.disable();
    });
  }

  switchToEditMode(): void {
    this.mode = 'edit';
    this.enableForm();
    this.markControlsAsTouched(this.getForm());
  }

  async switchToViewMode(): Promise<void> {
    this.mode = 'view';
    await this.initForm();
    this.disableForm();
  }

  openDiscardChangesDialogue(dialogueService: NbDialogService): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const dialogRef: NbDialogRef<any> = dialogueService.open(AWMSConfirmationDialogueComponent, {
        context: {
          title: 'Discard changes',
          message: 'Are you sure you want to discard your changes?',
        },
      });

      dialogRef.onClose.subscribe(result => {
        resolve(result);
      });
    });
  }

  abstract getData(uuid: string);
  abstract initForm();
}
