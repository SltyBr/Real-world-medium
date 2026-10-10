import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { email, form, FormField, minLength, required, schema, FormRoot } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { UsersService } from '@api/services';
import { firstValueFrom } from 'rxjs';
import { ErrorMessages } from 'src/app/shared/components/error-messages/error-messages';
import { CanDisable } from 'src/app/shared/directives/disabled';
import { UserState } from 'src/app/shared/services/user-state';
import { LOCAL_STORAGE } from 'src/app/shared/tokens/local-storage';

interface ISignUp {
  email: string;
  username: string;
  password: string;
}

const INITIAL_DATA: ISignUp = {
  email: '',
  password: '',
  username: ''
};

const signUpSchema = schema<ISignUp>(fieldPath => {
  required(fieldPath.email, { message: 'email required' });
  email(fieldPath.email, { message: 'Enter a valid email' });
  required(fieldPath.password, { message: 'password required' });
  required(fieldPath.username, { message: 'username required' });
  minLength(fieldPath.username, 3, { message: 'min length 3' })
  minLength(fieldPath.password, 3, { message: 'min length 3' })
});

@Component({
  imports: [FormField, ErrorMessages, CanDisable, FormRoot, RouterLink, NgClass],
  selector: 'app-sign-up',
  styles: ``,
  template: `
    <h1 class="text-4xl">Sign Up</h1>
    <a
      [routerLink]="['/sign-in']"
      class="text-green-500 hover:underline">
      Have an account?</a>
    <form [formRoot]="signUpForm" class="flex flex-col gap-4 w-[40%] min-w-[300px]" (submit)="onSubmit($event)">
      <div>
        <label class="block w-full">
          <input
            type="input"
            placeholder="user name"
            class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500 focus:invalid:outline-2 focus:invalid:outline-red-500"
            [formField]="signUpForm.username"
            [ngClass]="{
              'invalid:border invalid:border-red-500': signUpForm.username().touched() && signUpForm.username().invalid()
            }" />
        </label>
        <app-error-messages [control]="signUpForm.username()" />
      </div>

      <div>
        <label class="block w-full">
          <input
            type="email"
            placeholder="email"
            class="w-full text-xl px-3 py-2 border border-light rounded-xl"
            [formField]="signUpForm.email"/>
        </label>
        <app-error-messages [control]="signUpForm.email()" />
      </div>

      <div>
        <label class="block w-full">
          <input
            type="password"
            class="w-full text-xl px-3 py-2 border border-light rounded-xl"
            placeholder="password"
            [formField]="signUpForm.password"/>
        </label>
        <app-error-messages [control]="signUpForm.password()" />
      </div>

      <div class="text-end">
        <button
          [disabled]="signUpForm().submitting()"
          class="disabled:opacity-20 w-fit py-2 px-4 bg-green-500 rounded-xl text-white enabled:hover:bg-green-600 enabled:cursor-pointer text-xl"
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
export class SignUp {
  usersService = inject(UsersService);
  localStorage = inject(LOCAL_STORAGE);
  $user = inject(UserState).$user;

  signUpModel = signal<ISignUp>(INITIAL_DATA);
  signUpForm = form(this.signUpModel, signUpSchema, {
    submission: {
      action: async () => {
        try {
          const credentials = this.signUpModel();
          const v = await firstValueFrom(this.usersService.registerApiUsersPost({ user: credentials }));
          const { user: { token, email, username } } = v;
          this.localStorage.setItem('jwtToken', token);
          this.$user.set({ email, username });
        } catch (err) {
          // TODO
        }
      }
    }
  });


  onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}
