import { IStoneState } from './state';

export interface IStoneGetters {
  userList(state: IStoneState): any;
}

export const StoneGetters: IStoneGetters = {
  userList(state: IStoneState): any {
    return state.userList;
  },
};
