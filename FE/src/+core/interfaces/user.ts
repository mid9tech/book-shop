import { USER_GENDER } from "../enums";

// Define the TypeScript type for the user input
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: USER_GENDER;
  birthDate?: string;
  avatar?: string;
}

export interface RefreshPasswordInput {
  id: string;
  token: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
