import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileForm from '../../profile-form/profile-form';
import { User } from '../../../stores/user';
import Alert from '../../alert/alert';
import { Hr } from '../../ui/ui';
import STRINGS from '../../../../localize-strings';

interface WhyProfileState {
  expanded: boolean;
}

class WhyProfile extends React.Component<{}, WhyProfileState> {
  state = { expanded: false };

  private toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <div id="why-profile-title">
          {expanded ? (
            STRINGS.profileActionsTitle
          ) : (
            <a onClick={this.toggle}>{STRINGS.profileActionsTitle}</a>
          )}
        </div>
        {expanded && (
          <div id="why-profile">
            <p id="why-profile-text">{STRINGS.profileActionsContent}</p>
            <a onClick={this.toggle}>Затвори</a>
          </div>
        )}
      </div>
    );
  }
}

interface PropsFromState {
  hasEnteredInfo: boolean;
}

interface State {
  profileFormVisible: boolean;
  alertVisible: boolean;
}

class ProfileActions extends React.Component<PropsFromState, State> {
  state: State = {
    profileFormVisible: false,
    alertVisible: false,
  };

  private toggleProfileForm = () => {
    this.setState({
      profileFormVisible: !this.state.profileFormVisible,
      alertVisible: this.props.hasEnteredInfo,
    });
  };

  private closeAlert = () => {
    this.setState({
      alertVisible: false,
    });
  };

  render() {
    const { profileFormVisible, alertVisible } = this.state;
    return (
      <div id="profile-actions">
        {!profileFormVisible && <Hr />}
        {alertVisible && (
          <Alert autoHide onClose={this.closeAlert}>
            {STRINGS.profileActionsSuccesMsg}
          </Alert>
        )}
        {this.props.hasEnteredInfo ? (
          <Link to="/profile">{STRINGS.profileActionsEditProfile}</Link>
        ) : (
          <div>
            {profileFormVisible ? (
              <div id="profile-form-container">
                <ProfileForm onExit={this.toggleProfileForm} />
              </div>
            ) : (
              <button type="button" onClick={this.toggleProfileForm}>
                {STRINGS.profileActionsCreateProfile}
              </button>
            )}
            <WhyProfile />
          </div>
        )}
      </div>
    );
  }
}

export default connect<PropsFromState>(({ user }) => ({
  hasEnteredInfo: User.selectors.hasEnteredInfo(user),
}))(ProfileActions);
