import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserRequest, UserService } from '../../service/UserService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-form-component',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-user-form-component.html',
  styleUrl: './update-user-form-component.scss',
})
export class UpdateUserFormComponent implements OnInit{

  ngOnInit(): void {
    // Initialization logic
  }

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  updateUserForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  errorMessaege = signal<string>('');
  successMessage = signal<string>('');

  constructor() {
    this.updateUserForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      gamertag: [''],
      consoleId: [''],
      aboutUser: [''],
      gameIds: ['']
    });
  }

  onSubmit(): void {
    console.log('submit called');
    console.log('form valid:', this.updateUserForm.valid);
    console.log('form value:', this.updateUserForm.value);
    console.log('form rawValue:', this.updateUserForm.getRawValue());

    this.isSubmitting.set(true);
    this.errorMessaege.set('');
    this.successMessage.set('');

    const formValue = this.updateUserForm.getRawValue();
    this.updateUser(formValue);
  }

  private updateUser(formValue: any): void {

    const updateRequestId = formValue.id;
    const request: UpdateUserRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      gamertag: formValue.gamertag,
      consoleId: formValue.consoleId,
      aboutUser: formValue.aboutUser,
      gameIds: formValue.gameIds ? formValue.gameIds.split(',').map((id: string) => parseInt(id.trim(), 10)).filter((n: number) => !isNaN(n)) : []
    };

    console.log('sending request payload:', request);

    this.userService.updateUser(updateRequestId, request).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        this.successMessage.set('User updated successfully.');
        this.isSubmitting.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.errorMessaege.set('Error updating user. Please try again.');
        this.isSubmitting.set(false);
      }
    });
  }
}
