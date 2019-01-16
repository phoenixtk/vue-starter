import { AppDefaultState, IAppState }         from './app/state';
import { StmoduleDefaultState, IStmoduleState }         from './stmodule/state';
import { LoginDefaultState, ILoginState }         from './login/state';
import { AframeDefaultState, IAframeState }         from './aframe/state';
import { StoneDefaultState, IStoneState }         from './admin/stone/state';
import { StelementuiDefaultState, IStelementuiState }         from './admin/stelementui/state';

export interface IState {
  [key: string]: any;

  app?: IAppState;
  stmodule?: IStmoduleState;
  login?: ILoginState;
  aframe?: IAframeState;
  stone?: IStoneState;
  stelementui?: IStelementuiState;
}

export const DefaultState: IState = {
  app:     {
    ...AppDefaultState(),
  },
  stmodule: {
    ...StmoduleDefaultState(),
  },
  login: {
    ...LoginDefaultState(),
  },
  aframe: {
    ...AframeDefaultState(),
  },
  stone: {
    ...StoneDefaultState(),
  },
  stelementui: {
    ...StelementuiDefaultState(),
  },
};
