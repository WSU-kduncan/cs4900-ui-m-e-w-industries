import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService, AddUserRequest } from '../../service/UserService.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form-component.html',
  styleUrls: ['./user-form-component.scss'],
})
export class UserFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  userForm: FormGroup;
  isSubmitting = signal<boolean>(false);
  errorMessaege = signal<string>('');
  successMessage = signal<string>('');

  constructor() {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    // Initialization logic
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      email: [''],
      gamertag: [''],
      consoleId: [''],
      aboutUser: [''],
      gameIds: ['']
    });
  }

  onSubmit(): void {
    console.log('submit called');
    console.log('form valid:', this.userForm.valid);
    console.log('form value:', this.userForm.value);
    console.log('form rawValue:', this.userForm.getRawValue());

    this.isSubmitting.set(true);
    this.errorMessaege.set('');
    this.successMessage.set('');

    const formValue = this.userForm.getRawValue();
    this.addUser(formValue);
  }

  private addUser(formValue: any): void {

    const request: AddUserRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dob: formValue.dob,
      email: formValue.email,
      gamertag: formValue.gamertag,
      consoleId: formValue.consoleId,
      aboutUser: formValue.aboutUser,
      gameIds: formValue.gameIds ? formValue.gameIds.split(',').map((id: string) => parseInt(id.trim(), 10)).filter((n: number) => !isNaN(n)) : []
    }

    console.log('sending request payload:', request);

    this.userService.addUser(request).subscribe({
      next: () => {
        console.log('create success');
        this.successMessage.set('User added successfully!');
        this.isSubmitting.set(false);
        this.userForm.reset();

        this.router.navigateByUrl('/').then(success => {
          if (!success) {
            window.location.href = '/';
          }
        }).catch(() => {
          window.location.href = '/';
        });
      },
      error: (err: HttpErrorResponse | any) => {
        console.error('create failed', err);
        const msg = err?.error?.message ?? err?.message ?? 'Unknown error';
        this.errorMessaege.set('Failed to add user: ' + msg);
        this.isSubmitting.set(false);
      }
    });
  }
}
