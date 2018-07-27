import React from 'react';
import { translate } from 'react-i18next';

const Error = ({msg, subMsg, t}) =>
    <div className="ui negative message">
        <div className="header">
            {t('error.general')}
        </div>
        <p>{msg}</p>
        <p><small>{subMsg}</small></p>
    </div>
;

export default translate('translations')(Error);