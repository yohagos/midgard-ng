import { FormControl } from "@angular/forms";

export class Login {
  constructor(
    public email: string | null = null,
    public password: string | null = null,
  ) {}

  isValid() {
    return this.email && this.password;
  }
}

export type LoginForm = {
  email: FormControl<string|null>;
  password: FormControl<string|null>;
}
