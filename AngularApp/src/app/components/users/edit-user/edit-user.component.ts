import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private cdRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.editUserForm = this.fb.group({
      name: [this.data.user.name, Validators.required],
      email: [this.data.user.email, Validators.required],
    });
    this.cdRef.detectChanges();
  }

  submit(): void {
    const payload = {
      name: this.editUserForm.value.name,
      email: this.editUserForm.value.email
    };
    this.userService.updateUser(this.data.user._id, payload).subscribe((res) => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  isDisabled() {
    return this.data.user.name === this.editUserForm.value.name &&
      this.data.user.email === this.editUserForm.value.email;
  }
}
