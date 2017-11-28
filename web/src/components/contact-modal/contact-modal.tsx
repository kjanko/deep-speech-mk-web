import * as React from 'react';
import Modal from '../modal/modal';
import { LabeledInput, LabeledTextArea } from '../ui/ui';

interface Props {
  onRequestClose: () => void;
}

export default ({ onRequestClose }: Props) => (
  <Modal innerClassName="contact-modal">
    <form action="mailto:mikey@mozilla.com" method="post" encType="text/plain">
      <div className="title-and-action">
        <h1>Форма за контакт</h1>
        <a onClick={onRequestClose}>Назад</a>
      </div>

      <br />

      <LabeledInput label="Е-маил" name="email" required type="text" />

      <LabeledInput label="Име" name="name" type="text" />

      <LabeledTextArea label="Порака" name="message" required rows={6} />

      <div className="actions">
        <div>*задолжително</div>
        <button type="submit">Поднеси</button>
        <div />
      </div>
    </form>
  </Modal>
);
