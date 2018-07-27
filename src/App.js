import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import SelectedDate from './components/SelectedDate';
import Menu from './components/common/Menu';
import { getLanguage } from './storage/language';
import { translate } from 'react-i18next';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language : getLanguage()
    };
  }
  onLanguageChanged = () => {
    const { i18n } = this.props;
    const lang = getLanguage();

    this.setState({language : lang});
    i18n.changeLanguage(lang);
  }

  render() {
    const { language } = this.state;

    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui container">
          <Menu onLanguageChanged={this.onLanguageChanged} />
        </div>
        <Switch>
            <Route exact path='/' render={(props) => <Main {...props} language={language} />} />
            <Route path='/findDate' render={(props) => <SelectedDate {...props} language={language} />} />
            <Route path='/:day' render={(props) => <Main {...props} language={language} />} />
        </Switch>
      </div>
    );
  }
}

export default translate('translations')(App);
