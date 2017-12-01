import pick = require('lodash.pick');
import * as React from 'react';
import { connect } from 'react-redux';
import StateTree from '../../stores/tree';
import { ACCENTS, AGES, GENDERS, User } from '../../stores/user';
import Modal from '../modal/modal';
import { LabeledInput, LabeledSelect } from '../ui/ui';
import STRINGS from '../../../localize-strings';

interface EditableUser {
  email: string;
  username: string;
  accent: string;
  age: string;
  gender: string;
  sendEmails: boolean;
}

const userFormFields = [
  'email',
  'username',
  'accent',
  'age',
  'gender',
  'sendEmails',
];

const filterUserFields = (data: any) =>
  pick(data, userFormFields) as EditableUser;

interface PropsFromState {
  user: EditableUser;
  hasEnteredInfo: boolean;
}

interface PropsFromDispatch {
  clear: () => void;
  updateUser: (state: any) => void;
}

interface Props extends PropsFromState, PropsFromDispatch {
  onExit?: () => any;
}

interface State extends EditableUser {
  showClearModal: boolean;
}

class ProfileForm extends React.Component<Props, State> {
  state = { ...filterUserFields(this.props.user), showClearModal: false };

  private toggleClearModal = () => {
    this.setState(state => ({ showClearModal: !state.showClearModal }));
  };

  private clear = () => {
    this.props.clear();
    // We have to use setTimeout here because the new user-props will only be available after the next tick
    setTimeout(() => {
      this.setState({
        ...filterUserFields(this.props.user),
        showClearModal: false,
      });
    });
  };

  private update = ({ target }: any) => {
    this.setState({
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    });
  };

  private save = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { updateUser, onExit } = this.props;
    updateUser(filterUserFields(this.state));

    onExit && onExit();
  };

  render() {
    const { hasEnteredInfo, onExit, user } = this.props;
    const { email, username, accent, age, gender, sendEmails } = this.state;

    const isModified = userFormFields.some(key => {
      const typedKey = key as keyof EditableUser;
      return this.state[typedKey] !== user[typedKey];
    });

    return (
      <div id="profile-card">
        {this.state.showClearModal && (
          <Modal
            onRequestClose={this.toggleClearModal}
            buttons={{
              'Keep Data': this.toggleClearModal,
              'Delete Data': this.clear,
            }}>
            {STRINGS.profileFormModalText}
          </Modal>
        )}

        <div className="title-and-action">
          <h1>{STRINGS.profileActionsCreateProfile}</h1>
          <a onClick={onExit || this.toggleClearModal}>
            {onExit
              ? STRINGS.profileFormExitForm
              : hasEnteredInfo && STRINGS.profileFormDeleteProfile}
          </a>
        </div>
        <br />

        <form onSubmit={this.save}>
          <LabeledInput
            className="half-width"
            label={STRINGS.email}
            name="email"
            onChange={this.update}
            type="email"
            value={email}
          />

          <LabeledInput
            className="half-width"
            label={STRINGS.username}
            name="username"
            onChange={this.update}
            type="text"
            value={username}
          />

          <label id="opt-in">
            <input
              onChange={this.update}
              name="sendEmails"
              type="checkbox"
              checked={sendEmails}
            />
            {STRINGS.profileFormAcceptMessages}
          </label>

          <hr />

          <LabeledSelect
            className="half-width"
            disabled
            label={STRINGS.language}
            name="language"
            tabIndex={-1}>
            <option value="">{STRINGS.profileFormMoreLanguages}</option>
          </LabeledSelect>

          <LabeledSelect
            className="half-width"
            label="Акцент"
            name={STRINGS.accent}
            onChange={this.update}
            value={accent}>
            {this.renderOptionsFor(ACCENTS)}
          </LabeledSelect>

          <LabeledSelect
            className="half-width"
            label={STRINGS.age}
            name="age"
            onChange={this.update}
            value={age}>
            {this.renderOptionsFor(AGES)}
          </LabeledSelect>

          <LabeledSelect
            className="half-width"
            label={STRINGS.gender}
            name="gender"
            onChange={this.update}
            value={gender}>
            {this.renderOptionsFor(GENDERS)}
          </LabeledSelect>

          <div className="buttons">
            <button type="submit" className={isModified ? 'dark' : ''}>
              {isModified ? STRINGS.save : STRINGS.saved}
            </button>
          </div>
        </form>
      </div>
    );
  }

  private renderOptionsFor(options: any) {
    return Object.keys(options).map(key => (
      <option key={key} value={key}>
        {options[key]}
      </option>
    ));
  }
}

const mapStateToProps = ({ user }: StateTree) => ({
  user,
  hasEnteredInfo: User.selectors.hasEnteredInfo(user),
});

const mapDispatchToProps = (dispatch: any) => ({
  clear: () => dispatch(User.actions.clear()),
  updateUser: (state: any) => dispatch(User.actions.update(state)),
});

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
