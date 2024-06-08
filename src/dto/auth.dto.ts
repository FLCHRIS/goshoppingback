export interface CreateUserDto {
  userName: string;
  password: string;
  email: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
