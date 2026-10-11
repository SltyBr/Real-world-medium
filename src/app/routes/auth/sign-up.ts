import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { email, form, minLength, required, schema, FormRoot, FormField, FieldState } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { UsersService } from '@api/services';
import { firstValueFrom } from 'rxjs';
import { Input } from 'src/app/shared/components/input/input';
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
  imports: [CanDisable, FormRoot, RouterLink, Input, FormField, NgClass],
  selector: 'app-sign-up',
  styles: ``,
  template: `
    <h1 class="text-4xl">Sign Up</h1>
    <a
      [routerLink]="['/sign-in']"
      class="text-green-500 hover:underline"
    >
      Have an account?
    </a>
    <form [formRoot]="signUpForm" class="flex flex-col gap-4 w-[40%] min-w-[300px]" (submit)="onSubmit($event)">
      <app-input [control]="signUpForm.username" placeholder="username">
        <input
          coInput
          placeholder="username"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="signUpForm.username"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(signUpForm.username)()
          }" />
      </app-input>
      <app-input [control]="signUpForm.email">
        <input
          coInput
          type="email"
          placeholder="email"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="signUpForm.email"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(signUpForm.email)()
          }"
        />
      </app-input>
      <app-input [control]="signUpForm.password">
        <input
          coInput
          type="password"
          placeholder="password"
          class="w-full text-xl px-3 py-2 border border-light rounded-xl focus:outline-2 focus:outline-green-500"
          [formField]="signUpForm.password"
          [ngClass]="{
            'focus:outline-2 focus:outline-red-500 border-red-500': canCheck(signUpForm.password)()
          }"
        />
      </app-input>

      <div class="text-end">
        <button
          canDisable
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

  canCheck = (state: () => FieldState<string, string>) => computed(() => {
    const control = state();

    return control.touched() && control.invalid() && control.dirty();
  })

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}
