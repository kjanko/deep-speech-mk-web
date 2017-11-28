import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import API from '../../../services/api';
import Tracker from '../../../services/tracker';
import { Recordings } from '../../../stores/recordings';
import StateTree from '../../../stores/tree';
import { User } from '../../../stores/user';
import ListenBox from '../../listen-box/listen-box';
import Modal from '../../modal/modal';
import ProgressButton from '../../progress-button';
import ProfileActions from './profile-actions';

interface PropsFromState {
  api: API;
  recordingsCount: number;
  sentenceRecordings: Recordings.SentenceRecordings;
  user: User.State;
}

interface PropsFromDispatch {
  buildNewSentenceSet: typeof Recordings.actions.buildNewSentenceSet;
  tallyRecording: typeof User.actions.tallyRecording;
  updateUser: typeof User.actions.update;
}

interface Props
  extends PropsFromState,
    PropsFromDispatch,
    RouteComponentProps<any> {
  onRedo(sentence: string): any;
}

interface State {
  showPrivacyModal: boolean;
  showResetModal: boolean;
  progress: number;
  uploading: boolean;
}

class Review extends React.Component<Props, State> {
  tracker = new Tracker();

  state = {
    showPrivacyModal: false,
    showResetModal: false,
    progress: 0,
    uploading: false,
  };

  private handlePrivacyAction(didAgree: boolean): void {}

  private ensurePrivacyAgreement(): Promise<void> {
    if (this.props.user.privacyAgreed) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      this.handlePrivacyAction = (didAgree: boolean): void => {
        this.handlePrivacyAction = null;
        this.setState({
          showPrivacyModal: false,
        });

        if (didAgree) {
          this.props.updateUser({ privacyAgreed: true });
          resolve();
        } else {
          reject();
        }
      };
      this.setState({
        showPrivacyModal: true,
      });
    });
  }

  private resetAndGoHome = () => {
    this.props.buildNewSentenceSet();
    this.props.history.push('/');
  };

  private toggleResetModal = () => {
    this.setState({ showResetModal: !this.state.showResetModal });
  };

  private handleSubmit = async () => {
    this.setState({
      uploading: true,
    });

    try {
      await this.ensurePrivacyAgreement();

      const {
        api,
        recordingsCount,
        sentenceRecordings,
        tallyRecording,
      } = this.props;

      let i = 0;
      for (const [sentence, recording] of Object.entries(sentenceRecordings)) {
        await api.uploadAudio(recording.blob, sentence);

        tallyRecording();

        this.setState({
          progress: Math.floor((i + 1) / recordingsCount * 100),
        });

        i++;
      }
      await this.props.api.uploadDemographicInfo();
      this.props.buildNewSentenceSet();
      this.tracker.trackSubmitRecordings();
    } catch (e) {
      this.setState({
        uploading: false,
      });
      this.setState({ showResetModal: true });
    }
  };

  render() {
    const { uploading, showPrivacyModal, showResetModal } = this.state;
    return (
      <div id="voice-submit">
        {showPrivacyModal && (
          <Modal
            buttons={{
              'Се согласувам': () => this.handlePrivacyAction(true),
              'Не се согласувам': () => this.handlePrivacyAction(false),
            }}>
            Со користење на Common Voice, се согласувате со нашите{' '}
            <a target="_blank" href="/terms">
              Услови
            </a>{' '}
            и{' '}
            <a target="_blank" href="/privacy">
              Известувања за приватност
            </a>.
          </Modal>
        )}
        {showResetModal && (
          <Modal
            buttons={{
              'Зачувај ги снимките': this.toggleResetModal,
              'Избриши ги снимките': this.resetAndGoHome,
            }}>
            Прикачувањето е откажано. Дали сакате да ги избришеме вашите снимки?
          </Modal>
        )}
        <div id="voice-submit-review">
          <h2>Преглед и Поднесување</h2>
          <br />
          <p>
            Ви благодариме за аудио снимките<br />
            Прегледајте и поднесете ги вашите снимки подолу.
          </p>
        </div>
        <p id="box-headers">
          <span>Прегледај</span>
          <span>Пресними</span>
        </p>
        {Object.entries(
          this.props.sentenceRecordings
        ).map(([sentence, recording]) => (
          <ListenBox
            key={sentence}
            src={recording.url}
            onDelete={this.props.onRedo.bind(this, sentence)}
            sentence={sentence}
          />
        ))}
        <br />
        <div className="actions">
          <a onClick={this.toggleResetModal}>Прекини поднесување</a>
          <ProgressButton
            percent={uploading ? 100 : 0}
            disabled={uploading}
            onClick={this.handleSubmit}
            text="Поднеси"
          />
        </div>
        <ProfileActions />
      </div>
    );
  }
}

const mapStateToProps = ({ api, recordings, user }: StateTree) => ({
  api,
  recordingsCount: Recordings.selectors.recordingsCount(recordings),
  sentenceRecordings: recordings.sentenceRecordings,
  user,
});

const mapDispatchToProps = {
  buildNewSentenceSet: Recordings.actions.buildNewSentenceSet,
  tallyRecording: User.actions.tallyRecording,
  updateUser: User.actions.update,
};

export default withRouter(
  connect<PropsFromState, PropsFromDispatch>(
    mapStateToProps,
    mapDispatchToProps
  )(Review)
);
