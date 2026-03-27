import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#fdf8f6] px-4 pt-20">
      <div class="max-w-2xl w-full glass-morphism p-10 rounded-3xl shadow-2xl fade-in my-10">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-serif text-primary-900 mb-2">Create Account</h2>
          <p class="text-sm text-gray-500 font-light italic">Join the Aurora skincare community</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">First Name</label>
            <input 
              type="text" 
              formControlName="firstName"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="Jane"
            >
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">Last Name</label>
            <input 
              type="text" 
              formControlName="lastName"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="Doe"
            >
          </div>

          <div class="md:col-span-2 space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">Email Address</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="jane.doe@example.com"
            >
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">Password</label>
            <input 
              type="password" 
              formControlName="password"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="••••••••"
            >
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">Confirm Password</label>
            <input 
              type="password" 
              formControlName="confirmPassword"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="••••••••"
            >
          </div>

          <div class="md:col-span-2 space-y-4 pt-4">
            <button 
              type="submit" 
              [disabled]="registerForm.invalid || isLoading"
              class="w-full premium-btn premium-btn-primary py-4 uppercase tracking-[0.2em] text-xs shadow-lg"
            >
              <span *ngIf="!isLoading">CREATE ACCOUNT</span>
              <span *ngIf="isLoading">PROCESSING...</span>
            </button>

            <p class="text-center text-sm text-gray-500 font-light">
              Already have an account? 
              <a routerLink="/auth/login" class="text-gold-500 font-bold hover:underline ml-1">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  isLoading = false;

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.router.navigate(['/']);
          }
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}
