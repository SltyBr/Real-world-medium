import { Injectable, signal } from '@angular/core';
import { NewUserBody } from '@api/models';

@Injectable({
  providedIn: 'root'
})
export class UserState {
  $user = signal<NewUserBody | null>(null);
  $loading = signal<boolean>(false);
}