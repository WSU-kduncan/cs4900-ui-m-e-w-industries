import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService, AddUserRequest } from '../../service/UserService.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-form-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  userForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  errorMessaege = signal<string>('');
  successMessage = signal<string>('');

  ngOnInit(): void {
    // Initialization logic
  }

  constructor() {
    this.userForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      email: [''],
      gamertag: [''],
      preferredConsole: [''],
      aboutUser: [''],
      gameIds: ['']
    });
  }

  onSubmit(): void {
    this.isSubmitting.set(true);
    this.errorMessaege.set('');
    this.successMessage.set('');

    const formValue = this.userForm.value;
    this.addUser(formValue);

    this.successMessage.set('User added successfully!');
    this.isSubmitting.set(false);
    this.userForm.reset();
    this.router.navigate(['/dashboard']);
  }

  private addUser(formValue: any): void {

    const request: AddUserRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dob: formValue.dob,
      email: formValue.email,
      gamertag: formValue.gamertag,
      preferredConsole: formValue.preferredConsole,
      aboutUser: formValue.aboutUser,
      gameIds: formValue.gameIds ? formValue.gameIds.split(',').map((id: string) => parseInt(id.trim(), 10)) : []
    }

    this.userService.addUser(request).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this.successMessage.set('User added successfully!');
        this.isSubmitting.set(false);
      },
      error: (error: { message: string; }) => {
        this.errorMessaege.set('Failed to add user: ' + error.message);
      }
    });
  }


}
