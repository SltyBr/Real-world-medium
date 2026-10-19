import { NgClass } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { disabled, email, FieldState, form, FormField, FormRoot, minLength, required, schema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '@api/services';
import { firstValueFrom } from 'rxjs';
import { Input } from 'src/app/shared/components/input/input';
import { CanDisable } from 'src/app/shared/directives/disabled';
import { UserState } from 'src/app/shared/services/user-state';
import { LOCAL_STORAGE } from 'src/app/shared/tokens/local-storage';

interface ISignIn {
  email: string;
  password: string;
}

const INITIAL_DATA: ISignIn = {
  email: '',
  password: '',
};

const signInSchema = (formDisabled: WritableSignal<boolean>) => {
  return schema<ISignIn>(fieldPath => {
    required(fieldPath.email, { message: 'email required' });
    email(fieldPath.email, { message: 'Enter a valid email' });
    required(fieldPath.password, { message: 'password required' });
    minLength(fieldPath.password, 3, { message: 'min length 3' });
    disabled(fieldPath, () => formDisabled())
  });
}


@Component({
  imports: [RouterLink, FormRoot, Input, CanDisable, FormField, NgClass],
  selector: 'app-sign-in',
  styles: ``,
  template: `
    <h1 class="text-4xl">Sign in</h1>
    <a
      [routerLink]="['/sign-up']"
      class="text-green-500 hover:underline"
    >
      Need an account?
    </a>
    <form [formRoot]="signInForm" class="flex flex-col gap-4 w-[40%] min-w-[300px]" (submit)="onSubmit($event)">
      <app-input [control]="signInForm.email">
        <input
          coInput
          type="email"
          placeholder="email"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500 disabled:opacity-20"
          [formField]="signInForm.email"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(signInForm.email)()
          }"
        />
      </app-input>
      <app-input [control]="signInForm.password" placeholder="password" type="password">
        <input
          coInput
          type="password"
          placeholder="password"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500 disabled:opacity-20"
          [formField]="signInForm.password"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(signInForm.password)()
          }"
        />
      </app-input>

      <div class="text-end">
        <button
          canDisable
          [disabled]="signInForm().submitting()"
          class=" disabled:opacity-20 w-fit py-2 px-4 bg-green-500 rounded-xl text-white enabled:hover:bg-green-600 enabled:cursor-pointer text-xl"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  `,
  host: {
    class: `mt-8 flex flex-col gap-4 items-center`
  }
})
export class SignIn {
  usersService = inject(UsersService);
  localStorage = inject(LOCAL_STORAGE);
  router = inject(Router);
  $user = inject(UserState).$user;
  formDisabled = signal(false);

  signInModel = signal<ISignIn>(INITIAL_DATA);
  signInForm = form(this.signInModel, signInSchema(this.formDisabled), {
    submission: {
      action: async () => {
        try {
          this.formDisabled.set(true);
          const credentials = this.signInModel();
          const v = await firstValueFrom(this.usersService.loginApiUsersLoginPost({ user: credentials }));
          const { user: { token, email, username } } = v;
          this.localStorage.setItem('jwtToken', token);
          this.$user.set({ email, username });
          this.router.navigate(['/']);
        } catch (err) {
          this.formDisabled.set(false);
        }
      }
    }
  });

  canCheck = (state: () => FieldState<string, string>) => computed(() => {
    const control = state();

    return control.touched() && control.invalid() && control.dirty();
  })

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}