import { h, Component } from 'preact';
import Validator from '../validator';
import API from '../../api';
import User from '../../user';

interface Props {
  api: API;
  active: string;
  navigate(url: string): void;
  user?: User;
}

export default class Home extends Component<Props, void> {
  constructor(props) {
    super(props);
    this.onVote = this.onVote.bind(this);
  }

  onVote() {
    this.props.user && this.props.user.tallyVerification();
    this.props.navigate('/'); // force top level page render
  }

  render() {
    return <div id="home-container" className={this.props.active}>
      <h1 id="home-title">Project Jargon</h1>
      <div id="home-layout">
        <div className="left-column">
          <p>Гласот е природен, гласот е човечки. Затоа ние сме фасцинирани со креирање на употреблива гласовна технологија за нашите машини. Но за да се креираат гласовни системи, потребна е исклучително голема количина на гласовни податоци. Поголемиот дел од податоците што ги користат големите компании не се достапни до мнозинството на луѓе. Ние мислиме дека тоа ја задушува иновацијата. Затоа во соработка со Mozilla го лансиравме проектот "Jargon" кој ќе помогне во препознавањето на говор за македонски јазик. Сега можете да го донирате вашиот глас за да ни помогнете да изградиме гласовна база на податоци која ќе може да се искористи за да се направат иновативни апликации за вашите уреди и за веб.</p>

          <p>Прочитајте реченица за да им помогнете на машините да научат како луѓето зборуваат. Проверете ја работата на останатите соработници за да се подобри квалитетот. Тоа е толку едноставно!</p>
        </div>
        <div className="right-column">
          <p class="strong">Исто така можете да помогнете со тоа што ќе ги валидирате донациите!</p>
          <img class="curved-arrow" src="/img/curved-arrow.png" />
          <img class="circle" src="/img/circle.png" />
        </div>
        <div id="donate">
          <button onClick={evt => {
            this.props.navigate('/record')}}>Донирајте го вашиот глас!</button>
        </div>
      </div>
      <div id="try-it-container">
        <h1>Пробајте го!</h1>
        <p id="help-home" class="strong">Помогнете ни да валидираме &nbsp;<span>реченици.</span></p>
        <Validator onVote={this.onVote} api={this.props.api} />
      </div>
    </div>;
  }
}
