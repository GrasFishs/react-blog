import { IModel } from "src/types/redux";
import { IAction } from "src/types/redux";

const screen = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export interface IDeviceState {
  screenWidth: number;
  isMobile: boolean;
  isPad: boolean;
}

type Payload = IDeviceState;

export type IDeviceAction = IAction<Payload>;

export const deviceModel: IModel<IDeviceState, IDeviceAction> = {
  namespace: "device",
  state: {
    screenWidth: screen.md,
    isMobile: false,
    isPad: false
  },
  reducers: {
    SET_WIDTH(state, { payload: { screenWidth = screen.md } }) {
      const isMobile = screenWidth <= screen.sm;
      const isPad = screenWidth <= screen.md && screenWidth > screen.sm;
      return {
        ...state,
        isMobile,
        screenWidth,
        isPad
      };
    }
  }
};

export const deviceActions = {
  setWidth(width: number) {
    return {
      type: "device/SET_WIDTH",
      payload: {
        screenWidth: width
      }
    };
  }
};
