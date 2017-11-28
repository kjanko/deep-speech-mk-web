import pick = require('lodash.pick');
import { createSelector } from 'reselect';
import { generateGUID } from '../utility';
import StateTree from './tree';

export const ACCENTS = {
  '': '--',
  east: 'Источен',
  central: 'Централен',
  west: 'Западен',
};

export const AGES = {
  '': '',
  teens: '< 19',
  twenties: '19 - 29',
  thirties: '30 - 39',
  fourties: '40 - 49',
  fifties: '50 - 59',
  sixties: '60 - 69',
  seventies: '70 - 79',
  eighties: '80 - 89',
  nineties: '> 89',
};

export const GENDERS = {
  '': '',
  male: 'Машки',
  female: 'Женски',
  other: 'Друг',
};

type Accent = keyof typeof ACCENTS;
type Age = keyof typeof AGES;
type Gender = keyof typeof GENDERS;

export namespace User {
  export interface State {
    userId: string;
    email: string;
    username: string;
    sendEmails: boolean;
    accent: Accent;
    age: Age;
    gender: Gender;
    clips: number;
    privacyAgreed: boolean;
    hasDownloaded: boolean;

    recordTally: number;
    validateTally: number;
  }

  export interface UpdatableState {
    email?: string;
    username?: string;
    sendEmails?: boolean;
    accent?: Accent;
    age?: Age;
    gender?: Gender;
    privacyAgreed?: boolean;
    hasDownloaded?: boolean;
  }

  function getDefaultState(): State {
    return {
      userId: generateGUID(),
      email: '',
      username: '',
      sendEmails: false,
      accent: '',
      age: '',
      gender: '',
      clips: 0,
      privacyAgreed: false,
      hasDownloaded: false,
      recordTally: 0,
      validateTally: 0,
    };
  }

  enum ActionType {
    UPDATE = 'UPDATE_USER',
    TALLY_RECORDING = 'TALLY_RECORDING',
    TALLY_VERIFICATION = 'TALLY_VERIFICATION',
  }

  interface UpdateAction {
    type: ActionType.UPDATE;
    state: UpdatableState;
  }

  interface TallyRecordingAction {
    type: ActionType.TALLY_RECORDING;
  }

  interface TallyVerificationAction {
    type: ActionType.TALLY_VERIFICATION;
  }

  export type Action =
    | UpdateAction
    | TallyRecordingAction
    | TallyVerificationAction;

  export const actions = {
    update: (state: UpdatableState) => (
      dispatch: any,
      getState: () => StateTree
    ) => {
      getState()
        .api.syncUser()
        .catch(error => console.log(error));
      dispatch({
        type: ActionType.UPDATE,
        state,
      });
    },

    tallyRecording: (): TallyRecordingAction => ({
      type: ActionType.TALLY_RECORDING,
    }),

    tallyVerification: (): TallyVerificationAction => ({
      type: ActionType.TALLY_VERIFICATION,
    }),

    clear: (): UpdateAction => ({
      type: ActionType.UPDATE,
      state: getDefaultState(),
    }),
  };

  export function reducer(state = getDefaultState(), action: Action): State {
    switch (action.type) {
      case ActionType.UPDATE:
        return { ...state, ...action.state };

      case ActionType.TALLY_RECORDING:
        return { ...state, recordTally: state.recordTally + 1 };

      case ActionType.TALLY_VERIFICATION:
        return { ...state, validateTally: state.validateTally + 1 };

      default:
        return state;
    }
  }

  export const selectors = {
    hasEnteredInfo: createSelector<State, UpdatableState, boolean>(
      (state: State) =>
        pick(state, 'email', 'username', 'accent', 'age', 'gender'),
      (state: any) => Object.keys(state).some(k => Boolean(state[k]))
    ),
  };
}
