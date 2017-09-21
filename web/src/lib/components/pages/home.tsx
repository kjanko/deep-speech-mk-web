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
				<strong>JARGON ЈА НОСИ ВЕШТАЧКАТА ИНТЕЛИГЕНЦИЈА НА МАКЕДОНСКИ ЈАЗИК</strong> <br /> <br />
				Да се креира гласовна технологија за управување со машините е и предизвик и наша пасија. Креирањето гласовни системи бара многу податоци, но најголемиот дел од оние што ги користат големите компании не се достапни за мнозинството. Сметаме дека тоа ја попречува иновацијата и затоа во соработка со Mozilla го лансиравме проектот „Jargon”, како дел од "Common Voice", којшто ќе помогне во препознавањето говор на македонски јазик. 
				<br /><strong>Донирајте го и вие вашиот глас!</strong>
				<br />Треба само да ја прочитате реченицата која ви се прикажува на дисплејот, или да ја проверите работата на останатите волонтери кои веќе донирале. Толку е едноставно! 		
			</p>
		</div>
        <div className="right-column">
          <p class="strong">Придонесете со тоа што ќе ги валидирате гласовните донации!</p>
          <img class="curved-arrow" src="/img/curved-arrow.png" />
          <img class="circle" src="/img/circle.png" />
        </div>
        <div id="donate">
          <button onClick={evt => {
            this.props.navigate('/record')}}>Донирајте го вашиот глас!</button>
        </div>
      </div>
      <div id="try-it-container">
        <h1>Пробајте!</h1>
        <p id="help-home" class="strong">Помогнете ни да валидираме прочитаните &nbsp;<span>реченици.</span></p>
        <Validator onVote={this.onVote} api={this.props.api} />
      </div>
    </div>;
  }
}
