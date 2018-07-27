import React, { Component } from 'react';
import Name from './Name';
import { getToday, getTomorrow, getYesterday } from '../api/api';
import { getLanguage } from '../storage/language';
import { withRouter } from 'react-router';
import { DAYS } from '../constants/days';
import Loader from './common/Loader';
import Error from './common/Error';
import { translate } from 'react-i18next';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name : null,
          selectedDay : DAYS.TODAY,
          loading : true,
          error : null
        };
    }

    componentDidMount() {
        this.fetchData(this.props.match.params['day']);
    }

    componentWillReceiveProps(newProps) {
        this.fetchData(newProps.match.params['day']);
    }

    fetchData(selectedDay) {
        this.setState({loading : true});
        const day = parseInt(selectedDay || DAYS.TODAY, 0);
        this.setState({selectedDay : day});

        let promise;
        if (day === DAYS.TOMORROW) {
            promise = getTomorrow();
        } else if (day === DAYS.YESTERDAY) {
            promise = getYesterday();
        } else {
            promise = getToday();
        }

        const {t} = this.props;
        promise.then(data => this.setState({name : data['name_' + getLanguage()], loading : false, error : null}))
            .catch(error => this.setState({error : {msg : t('error.messages.dataLoading'), description : error.message}, loading : false}));
    }

    render() {
        const { name, loading, error } = this.state;
        return (
            <div className="ui container">
                {error ? <Error msg={error.msg} subMsg={error.description} /> :
                    loading ?
                        <Loader /> :
                        <Name name={name}  />
                }
            </div>
        );
    }
}

export default translate('translations')(withRouter(Main));