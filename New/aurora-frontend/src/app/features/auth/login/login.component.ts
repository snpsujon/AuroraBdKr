import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#fdf8f6] px-4 pt-20">
      <div class="max-w-md w-full glass-morphism p-10 rounded-3xl shadow-2xl fade-in">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-serif text-primary-900 mb-2">Welcome Back</h2>
          <p class="text-sm text-gray-500 font-light italic">Sign in to your Aurora account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-bold tracking-widest uppercase text-primary-900">Email Address</label>
            <input 
              type="email" 
              formControlName="email"
              class="w-full bg-white border-b-2 border-primary-100 py-3 px-2 focus:outline-none focus:border-gold-500 transition-all text-sm"
              placeholder="name@example.com"
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

          <div class="flex items-center justify-between text-[11px] font-bold tracking-tighter">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 rounded border-primary-200 text-gold-500 focus:ring-gold-500">
              <span class="uppercase">Remember Me</span>
            </label>
            <a href="#" class="text-gold-500 hover:text-primary-900 uppercase">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="w-full premium-btn premium-btn-primary py-4 uppercase tracking-[0.2em] text-xs shadow-lg"
          >
            <span *ngIf="!isLoading">SIGN IN</span>
            <span *ngIf="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AUTHENTICATING...
            </span>
          </button>

          <p class="text-center text-sm text-gray-500 font-light mt-8">
            Don't have an account? 
            <a routerLink="/auth/register" class="text-gold-500 font-bold hover:underline ml-1">Create One</a>
          </p>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
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
