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

    fetchData(day, month) {
        this.setState({loading: true});

        const {t} = this.props;
        getByDate(day, month).then(data =>this.setState({name : data['name_' + getLanguage()]}))
            .catch(error => this.setState({error : {msg : t('error.messages.dataLoading'), description : error.message}, loading : false}))
    }

    componentDidMount() {
        const today = new Date();
        this.fetchData(today.getDate(), today.getMonth() + 1);
        this.setState({
            date : today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear(),
            loading : false
        });
    }

    componentWillReceiveProps(newProps) {
        const today = new Date();
        this.fetchData(today.getDate(), today.getMonth() + 1);
        this.setState({
            date : today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear(),
            loading : false
        });
    }

    handleChange = (e, {value}) => {
        const dateSegments = value.split('.');
        this.fetchData(dateSegments[0], dateSegments[1]);
        this.setState({ date: value, loading : false });
    };

    render() {
        const {name, loading, error} = this.state;

        return (
            <div className="ui container">
                {error ? <Error msg={error.msg} subMsg={error.description} /> :
                    <div>
                        <DateInput placeholder="Select date"
                                onChange={this.handleChange}
                                dateFormat='DD.MM.YYYY'
                                value={this.state.date}
                                closable={true}
                                initialDate={new Date()}/>
                        {loading ?
                            <Loader /> :
                            <Name name={name}  />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default translate('translations')(SelectedDate);