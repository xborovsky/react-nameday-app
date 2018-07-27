import React from 'react';
import { DAYS } from '../../constants/days';
import { NavLink } from 'react-router-dom';
import Language from '../Language';
import { translate } from 'react-i18next';

const Menu = ({onLanguageChanged, t}) =>
    <div className="ui five item menu stackable">
        <NavLink to={`/${DAYS.YESTERDAY}`} activeClassName="active" className="item">{t('menu.yesterday')}</NavLink>
        <NavLink to='/' activeClassName="active" className="item" exact>{t('menu.today')}</NavLink>
        <NavLink to={`/${DAYS.TOMORROW}`} activeClassName="active" className="item">{t('menu.tomorrow')}</NavLink>
        <NavLink to='/findDate' activeClassName="active" className="item">{t('menu.findByDate')}</NavLink>
        <Language onLanguageChanged={onLanguageChanged} />
    </div>
;

export default translate('translations')(Menu);