import { IStoneState } from './state';

export interface IStoneMutations {
  SET_USERLIST(state: IStoneState, userList: any): void;
}

export const StoneMutations: IStoneMutations = {
  SET_USERLIST: (state: IStoneState, userList: any) => {
    state.userList = userList;
  },
};
