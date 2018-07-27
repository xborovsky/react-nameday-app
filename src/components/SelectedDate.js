import React, { Component } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { getByDate } from '../api/api';
import { getLanguage } from '../storage/language';
import Name from './Name';
import Loader from './common/Loader';
import { translate } from 'react-i18next';
import Error from './common/Error';

class SelectedDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : null,
            date : '',
            loading : true,
            error : null
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        const today = new Date();
        const {t} = this.props;
        getByDate(today.getDate(), today.getMonth() + 1).then(data =>this.setState({name : data['name_' + getLanguage()]}))
            .catch(error => this.setState({error : {msg : t('error.messages.dataLoading'), description : error.message}}))
        this.setState({
            date : today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear(),
            loading : false
        });
    }

    componentWillReceiveProps(newProps) {
        // TODO refaktor
        this.setState({loading: true});
        const today = new Date();
        const {t} = this.props;
        getByDate(today.getDate(), today.getMonth() + 1).then(data =>this.setState({name : data['name_' + getLanguage()]}))
            .catch(error => this.setState({error : {msg : t('error.messages.dataLoading'), description : error.message}}))
        this.setState({
            date : today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear(),
            loading : false
        });
    }

    handleChange = (e, {value}) => {
        this.setState({loading: true});
        const dateSegments = value.split('.');
        const {t} = this.props;
        getByDate(dateSegments[0], dateSegments[1]).then(data =>this.setState({name : data['name_' + getLanguage()]}))
            .catch(error => this.setState({error : {msg : t('error.messages.dataLoading'), description : error.message}}))
        this.setState({ date: value, loading : false });
    };

    render() {
        const {name, loading, error} = this.state;

        return (
            <div className="ui text container">
                {error ? <Error msg={error.msg} subMsg={error.description} /> :
                    <div>
                        <div className="ui hidden divider"></div>
                        <div className="ui text container">
                            <DateInput placeholder="Select date"
                                    onChange={this.handleChange}
                                    dateFormat='DD.MM.YYYY'
                                    value={this.state.date}
                                    closable={true}
                                    initialDate={new Date()}/>
                            { loading ?
                                <Loader /> :
                                <Name name={name}  />
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default translate('translations')(SelectedDate);