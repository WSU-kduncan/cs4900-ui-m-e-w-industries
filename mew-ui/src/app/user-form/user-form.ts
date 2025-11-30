
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService, CreateUserRequest } from '../user-service'; 
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  


   @Output() userCreated = new EventEmitter<void>(); 


   consoleOptions = [
    { id: 1, label: 'PlayStation' },
    { id: 2, label: 'Xbox' },
    { id: 3, label: 'Nintendo Switch' },
    { id: 4, label: 'PC' },
    { id: 5, label: 'Mobile' },
  ];


   consoleLabel(id: number): string {
    return {
      1: 'PlayStation',
      2: 'Xbox',
      3: 'Nintendo Switch',
      4: 'PC',
      5: 'Mobile',
    }[id] ?? `Unknown (${id})`;
  }

  userForm;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gamertag: ['', Validators.required],
      consoleId: [3, Validators.required],  
      aboutUser: [''],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const raw = this.userForm.value;

    const payload: CreateUserRequest = {
      firstName: raw.firstName!,
      lastName: raw.lastName!,
      dob: raw.dob!, 
      email: raw.email!,
      gamertag: raw.gamertag!,
      consoleId: Number(raw.consoleId), 
      aboutUser: raw.aboutUser || '',
      gameIds: [1, 2], 
    };

    this.userService.createUser(payload).subscribe({
  next: (createdUser: any) => {
    console.log('User created:', createdUser);
    this.isSubmitting = false;
    this.userForm.reset();
    this.userCreated.emit(); 
    
  },
  error: (err: any) => {
    console.error('Create user failed', err);
    this.isSubmitting = false;
    this.errorMessage = 'Something went wrong creating the user.';
  },
});
  }
}
