export interface IStoneState {
  userList: any;
}

export const StoneDefaultState = (): IStoneState => {
  return {
    userList: null,
  };
};
