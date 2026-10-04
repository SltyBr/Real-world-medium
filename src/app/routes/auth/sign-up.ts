import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required, schema, submit } from '@angular/forms/signals';
import { UserResource } from '@api/resources';
import { UserService, UsersService } from '@api/services';
import { ErrorMessages } from 'src/app/shared/components/error-messages/error-messages';
import { UserState } from 'src/app/shared/services/user-state';
import { LOCAL_STORAGE } from 'src/app/shared/tokens/local-storage';
import { CONTAINER } from 'src/app/tailwind-classes';

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
  imports: [FormField, ErrorMessages],
  selector: 'app-sign-up',
  styles: ``,
  template: `
    <form class="flex flex-col gap-4" (submit)="onSubmit($event)">
      <div>
        <label>
          <input type="input" [formField]="signUpForm.username" placeholder="user name"/>
        </label>
        <app-error-messages [control]="signUpForm.username()" />
      </div>

      <div>
        <label>
          <input type="email" [formField]="signUpForm.email" placeholder="email"/>
        </label>
        <app-error-messages [control]="signUpForm.email()" />
      </div>

      <div>
        <label>
          <input type="password" [formField]="signUpForm.password" placeholder="password"/>
        </label>
        <app-error-messages [control]="signUpForm.password()" />
      </div>

      <div class="text-end">
        <button class="w-fit py-2 px-4 bg-green-500 rounded-xl text-white hover:bg-green-600 cursor-pointer" type="submit">Sign up</button>
      </div>
    </form>
  `,
  host: {
    class: `${CONTAINER}`
  }
})
export class SignUp {
  signUpModel = signal<ISignUp>(INITIAL_DATA);
  signUpForm = form(this.signUpModel, signUpSchema);
  usersService = inject(UsersService);
  localStorage = inject(LOCAL_STORAGE);
  $user = inject(UserState).$user;


  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    submit(this.signUpForm, async () => {
      const credentials = this.signUpModel();
      this.usersService.registerApiUsersPost({
        user: credentials
      }).subscribe(v => {
        const { user: { token, email, username } } = v;
        this.localStorage.setItem('jwtToken', token);
        this.$user.set({ email, username });
      })
    });
  }
}
