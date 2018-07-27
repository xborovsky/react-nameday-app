import React, { Component } from 'react';
import { availableLangCodes } from '../storage/language';
import { Dropdown } from 'semantic-ui-react';
import { setLanguage } from '../storage/language';
import { translate } from 'react-i18next';

class Language extends Component {
    onChange = (e, data) => {
        setLanguage(data.value);
        this.props.onLanguageChanged();
    }

    render() {
        const {t} = this.props;
        return (
            <Dropdown text={t('language.text')} className="compact selection">
                <Dropdown.Menu>
                {
                    availableLangCodes.map(lang =>
                        <Dropdown.Item key={lang} onClick={this.onChange} value={`${lang}`}>
                            <i aria-hidden="true" className={`${lang} flag`}></i>
                        </Dropdown.Item>
                    )
                }
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default translate('translations')(Language);