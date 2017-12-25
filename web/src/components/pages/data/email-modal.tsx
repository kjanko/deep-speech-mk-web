import * as React from 'react';
import { connect } from 'react-redux';
import StateTree from '../../../stores/tree';
import { User } from '../../../stores/user';
import Modal from '../../modal/modal';
import { SuccessIcon } from '../../ui/icons';
import { LabeledInput } from '../../ui/ui';
import { FormEvent } from 'react';
import STRINGS from '../../../../localize-strings';

interface PropsFromState {
  user: User.State;
}

interface PropsFromDispatch {
  updateUser: typeof User.actions.update;
}

interface Props extends PropsFromState, PropsFromDispatch {
  onRequestClose: () => void;
}

interface State {
  email: string;
  isSubmitted: boolean;
}

class EmailModal extends React.Component<Props, State> {
  state = { email: this.props.user.email, isSubmitted: false };

  handleSubmit = (event: FormEvent<any>) => {
    event.preventDefault();
    this.props.updateUser({
      email: this.state.email,
      sendEmails: true,
    });
    this.setState({ isSubmitted: true });
  };

  render() {
    const { onRequestClose } = this.props;
    const { email, isSubmitted } = this.state;
    return (
      <Modal {...{ onRequestClose }} innerClassName="email-modal">
        <div className="head">
          <SuccessIcon />
          <h2>{STRINGS.emailModalHeader}</h2>
        </div>

        <form onSubmit={this.handleSubmit}>
          <p>{STRINGS.emailModalFormParagraphOne}
          </p>

          <LabeledInput
            label={isSubmitted ? '' : [STRINGS.enterEmail]}
            type="email"
            value={isSubmitted ? [STRINGS.emailModalKeepInTouch] : email}
            disabled={isSubmitted}
            onChange={(event: any) =>
              this.setState({ email: event.target.value })}
          />

          {!isSubmitted && <button type="submit">{STRINGS.submit}</button>}

          <a onClick={onRequestClose} className="cancel">
            {isSubmitted ? [STRINGS.returnToCommonVoiceDatasets] : [STRINGS.noThanks]}
          </a>

          {isSubmitted && <br />}

          <p className="fine-print">{STRINGS.emailModalFormParagraphTwo}
          </p>
          <br />

          <p className="fine-print">
            {STRINGS.emailModalFormParagraphThree}
            <a href="/privacy" target="__blank" rel="noopener noreferrer">
              {STRINGS.privacyInfo}
            </a>.
          </p>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state: StateTree) => ({
  user: state.user,
});

const mapDispatchToProps = {
  updateUser: User.actions.update,
};

export default connect<PropsFromState, PropsFromDispatch>(
  mapStateToProps,
  mapDispatchToProps
)(EmailModal);
