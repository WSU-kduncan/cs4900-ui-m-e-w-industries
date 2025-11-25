import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../service/UserService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form-component',
  imports: [],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {

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
}
