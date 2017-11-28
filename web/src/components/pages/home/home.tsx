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
        <h1 id="home-title">
          Jargon ја носи вештачката интелигенција на македонски јазик
        </h1>
        <div id="wall-of-text">
          <CardAction id="contribute-button" to="/record">
            <div>
              <RecordIcon />
            </div>
            Донирајте го вашиот глас!
          </CardAction>

          <p>
            Да се креира гласовна технологија за управување со машините е и
            предизвик и наша пасија. Креирањето гласовни системи бара многу
            податоци, но најголемиот дел од оние што ги кориситат големите
            компании не се достапни за мнозинството. Сметаме дека тоа ја
            попречува иновацијата и затоа со Mozzila го лансиравме проектот
            "Common voice", којшто ќе помогне во препознавањето говор на
            македонски јазик.{' '}
            {showWallOfText &&
              'Може да го донирате вашиот глас и да ни помогнете да изградиме отворена база' +
                ' на податоци за да може секој да создаде иновативна апликација за' +
                ' билокаков уред или вебстрана.'}
          </p>

          {!showWallOfText && (
            <a
              id="show-more-text"
              onClick={() => this.setState({ showWallOfText: true })}>
              Прочитај повеќе
            </a>
          )}

          {showWallOfText && (
            <p>
              Прочитајте реченица за да им помогнете на компјутерите да научат
              како луѓето зборуваат. Проверете ја работата на останатите и
              подоберете го квалитетот. Толку е едноставно!
            </p>
          )}
        </div>

        <Hr />

        <div>
          <h2>Помогнете да ги валидираме прочитаните реченици!</h2>
          <div id="help-explain">
            Притисни play, слушни и кажи ни: дали долунаведената реченица е
            точно прочитана?
          </div>

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
