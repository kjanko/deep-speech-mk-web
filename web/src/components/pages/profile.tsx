import * as React from 'react';
import STRINGS from '../../../localize-strings';
import ProfileForm from '../profile-form/profile-form';

import { RouteComponentProps } from 'react-router';

export default (props: RouteComponentProps<any>) => (
  <div id="profile-container">
    <ProfileForm />

    <br />
    <br />

    <h1>{STRINGS.profileActionsTitle}</h1>
    <br />
    <p>{STRINGS.profileActionsContent}</p>
  </div>
);
