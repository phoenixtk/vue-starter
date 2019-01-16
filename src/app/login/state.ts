export interface ILoginState {
  loginPending: boolean;
  token: string;
}

export const LoginDefaultState = (): ILoginState => {
  return {
    loginPending: false,
    token: '',
  };
};
