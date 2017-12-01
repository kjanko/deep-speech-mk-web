import * as React from 'react';
import Modal from '../modal/modal';
import { LabeledInput, LabeledTextArea } from '../ui/ui';
import STRINGS from '../../../localize-strings';

interface Props {
  onRequestClose: () => void;
}

export default ({ onRequestClose }: Props) => (
  <Modal innerClassName="contact-modal">
    <form action="mailto:mikey@mozilla.com" method="post" encType="text/plain">
      <div className="title-and-action">
        <h1>{STRINGS.contactModalHeader}</h1>
        <a onClick={onRequestClose}>{STRINGS.back}</a>
      </div>

      <br />

      <LabeledInput label={STRINGS.email} name="email" required type="text" />

      <LabeledInput label={STRINGS.name} name="name" type="text" />

      <LabeledTextArea label={STRINGS.message} name="message" required rows={6} />

      <div className="actions">
        <div>{STRINGS.required}</div>
        <button type="submit">{STRINGS.submit}</button>
        <div />
      </div>
    </form>
  </Modal>
);
