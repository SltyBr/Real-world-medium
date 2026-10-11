import { Component, inject, signal } from '@angular/core';
import { email, form, FormRoot, minLength, required, schema } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
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

const signInSchema = schema<ISignIn>(fieldPath => {
  required(fieldPath.email, { message: 'email required' });
  email(fieldPath.email, { message: 'Enter a valid email' });
  required(fieldPath.password, { message: 'password required' });
  minLength(fieldPath.password, 3, { message: 'min length 3' });
});


@Component({
  imports: [RouterLink, FormRoot, Input, CanDisable],
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
      <app-input [control]="signInForm.email" placeholder="email" type="email" />
      <app-input [control]="signInForm.password" placeholder="password" type="password"/>

      <div class="text-end">
        <button
          canDisable
          [disabled]="signInForm().submitting()"
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
export class SignIn {
  usersService = inject(UsersService);
  localStorage = inject(LOCAL_STORAGE);
  $user = inject(UserState).$user;

  signInModel = signal<ISignIn>(INITIAL_DATA);
  signInForm = form(this.signInModel, signInSchema, {
    submission: {
      action: async () => {
        try {
          const credentials = this.signInModel();
          const v = await firstValueFrom(this.usersService.loginApiUsersLoginPost({ user: credentials }));
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