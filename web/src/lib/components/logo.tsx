import { h, Component } from 'preact';

export default (props) => {
  return <a class="main-logo" href="/"
    onClick={(evt) =>  {
      evt.preventDefault();
      evt.stopPropagation();
      props.navigate('/');
    }}>
    <span class="main-title">Jargon</span><br />
    <span class="secondary-title">netcetera</span><br />
  </a>;
}
