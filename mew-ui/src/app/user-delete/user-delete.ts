import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService } from '../user-service';

@Component({
  standalone: true,
  selector: 'app-user-delete',
  templateUrl: './user-delete.html',
  styleUrl: './user-delete.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserDelete {
  @Output() userDeleted = new EventEmitter<number>();

  deleteForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.deleteForm = this.fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.deleteForm.invalid) {
      this.deleteForm.markAllAsTouched();
      return;
    }

    const raw = this.deleteForm.value;
    const id = Number(raw['userId']);

    if (!id || isNaN(id)) {
      this.errorMessage = 'Please enter a valid user ID.';
      return;
    }

    const confirmed = confirm(`Delete user with ID ${id}?`);
    if (!confirmed) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted:', id);
        this.isSubmitting = false;
        this.deleteForm.reset();
        this.userDeleted.emit(id);
      },
      error: (err: any) => {
        console.error('Failed to delete user', err);
        this.isSubmitting = false;
        this.errorMessage = 'Failed to delete user. Please check the ID.';
      },
    });
  }
}
