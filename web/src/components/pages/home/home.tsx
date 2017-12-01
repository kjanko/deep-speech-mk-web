import pick = require('lodash.pick');
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import API from '../../../services/api';
import { User } from '../../../stores/user';
import Validator from '../../validator';
import { RecordIcon } from '../../ui/icons';
import { CardAction, Hr } from '../../ui/ui';
import ProjectStatus from './project-status';
import STRINGS from '../../../../localize-strings';

interface PropsFromState {
  api: API;
}

interface PropsFromDispatch {
  tallyVerification: typeof User.actions.tallyVerification;
}

interface Props
  extends PropsFromState,
    PropsFromDispatch,
    RouteComponentProps<any> {}

interface State {
  showWallOfText: boolean;
}

class Home extends React.Component<Props, {}> {
  state = {
    showWallOfText: false,
  };

  onVote = () => {
    this.props.tallyVerification();
  };

  render() {
    const { showWallOfText } = this.state;
    return (
      <div id="home-container">
        <h1 id="home-title">{STRINGS.homeTitle}</h1>
        <div id="wall-of-text">
          <CardAction id="contribute-button" to="/record">
            <div>
              <RecordIcon />
            </div>
            {STRINGS.homeDonateVoice}
          </CardAction>

          <p>
            {STRINGS.homeDescriptionOne}{' '}
            {showWallOfText && STRINGS.homeDescriptionTwo}
          </p>

          {!showWallOfText && (
            <a
              id="show-more-text"
              onClick={() => this.setState({ showWallOfText: true })}>
              {STRINGS.homeReadMore}
            </a>
          )}
          {showWallOfText && <p> {STRINGS.homeDescriptionThree}</p>}
        </div>

        <Hr />

        <div>
          <h2>{STRINGS.homeHelpValidate}</h2>
          <div id="help-explain">{STRINGS.homeHelpExplain}</div>

          <Validator onVote={this.onVote} />
        </div>

        <br />
        <Hr />
        <br />

        <ProjectStatus />

        <br />
      </div>
    );
  }
}
export default withRouter(
  connect<PropsFromState, PropsFromDispatch>(
    state => pick(state, 'api'),
    pick(User.actions, 'tallyVerification')
  )(Home)
);
