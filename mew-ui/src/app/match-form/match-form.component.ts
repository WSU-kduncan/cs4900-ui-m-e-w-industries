import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService, Match } from '../services/match.service';

@Component({
  selector: 'app-match-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.css'
})
export class MatchFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private matchService = inject(MatchService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  matchForm!: FormGroup;
  isEditMode = signal(false);
  editingMatchId = signal<number | null>(null);
  isSubmitting = signal(false);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    // Initialize the form
    this.matchForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gamertag: ['', [Validators.required, Validators.minLength(3)]],
      aboutUser: ['']
    });

    // Check if we're in edit mode by looking for an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editingMatchId.set(Number(id));
      this.loadMatchData(Number(id));
    }
  }

  // Load match data for editing
  private loadMatchData(id: number): void {
    const match = this.matchService.getMatchById(id);
    if (match) {
      this.matchForm.patchValue({
        name: match.name,
        gamertag: match.gamertag,
        aboutUser: match.aboutUser
      });
    } else {
      this.errorMessage.set('Match not found');
    }
  }

  // Handle form submission
  onSubmit(): void {
    console.log('Form submitted');
    console.log('Form valid:', this.matchForm.valid);
    console.log('Form value:', this.matchForm.value);

    if (this.matchForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.matchForm.controls).forEach(key => {
        this.matchForm.get(key)?.markAsTouched();
      });
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const formValue = this.matchForm.value;

    if (this.isEditMode() && this.editingMatchId() !== null) {
      // UPDATE mode
      const updatedMatch: Match = {
        id: this.editingMatchId()!,
        name: formValue.name,
        gamertag: formValue.gamertag,
        aboutUser: formValue.aboutUser || ''
      };

      console.log('Updating match:', updatedMatch);

      this.matchService.updateMatch(updatedMatch).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.isSubmitting.set(false);
          alert('Match updated successfully!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating match:', error);
          this.isSubmitting.set(false);
          this.errorMessage.set('Error updating match. Changes saved locally.');
          // Even on error, navigate back after a delay
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      });
    } else {
      // CREATE mode
      const newMatch = {
        name: formValue.name,
        gamertag: formValue.gamertag,
        aboutUser: formValue.aboutUser || ''
      };

      console.log('Creating match:', newMatch);

      this.matchService.createMatch(newMatch).subscribe({
        next: (response) => {
          console.log('Create successful:', response);
          this.isSubmitting.set(false);
          alert('Match created successfully!');
          this.matchForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating match:', error);
          this.isSubmitting.set(false);
          this.errorMessage.set('Error creating match. Match saved locally.');
          // Even on error, navigate back after a delay
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      });
    }
  }

  // Cancel and go back
  onCancel(): void {
    this.router.navigate(['/']);
  }

  // Helper method to check if a field has an error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.matchForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.matchForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
    }
    return '';
  }
}
