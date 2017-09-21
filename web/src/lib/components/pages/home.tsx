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
			<p>
				<strong>Jargon ја носи вештачката интелигенција на македонски јазик</strong> <br />
				Да се креира употреблива гласовна технологија за управување со машините е голем предизвик, но и наша пасија. Креирањето гласовни системи бара исклучително голема количина гласовни податоци, но најголемиот дел од оние што ги користат големите компании не се достапни за мнозинството луѓе. 
				Сметаме дека тоа ја попречува иновацијата и затоа, во соработка со Mozilla, го лансиравме проектот “Jargon”, којшто ќе помогне во препознавањето говор на македонски јазик.
				Со “Jargon” секој ќе може да го донира својот глас за да се креира систем за препознавање гласовни команди, моќен колку што се Алекса и Сири и тоа, на македонски јазик. Сѐ што е потребно, е волонтери да читаат текст на глас или да ги валидираат веќе прочитаните примероци.  
			</p>
			<p>
				<strong>Учествувајте и вие!</strong>
				Отсега и вие можете да го донирате сопствениот глас за да ни помогнете да изградиме гласовна база на податоци, што ќе може да се искористи за да се направат иновативни мобилни и веб апликации за вашите уреди на вашиот мајчин јазик.
				Вие можете да им помогнете на машините да научат како зборуваат луѓето. 
			</p>
			<p>
				<strong>Како?</strong>
				Треба само да ја прочитате реченицата која ви се прикажува на дисплејот или пак, да ја проверите работата на останатите волонтери кои го донирале својот глас, за да се подобри квалитетот. Толку е едноставно!
			</p>
		</div>
        <div className="right-column">
          <p class="strong">Помогни за валидација на туѓите гласовни донации!</p>
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
