import React from 'react';
import classes from "./Header.module.scss"
import { useTranslation } from "react-i18next";
import Sidebar from './../Sidebar/index';
import { queryServer } from '../../hooks/fetch';
import classNames from 'classnames';

function Header() {

    const { t, i18n, ready } = useTranslation();
    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };

    return ( 
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.logo}>
                    <img src="AVN_new_SVG.svg" alt="" className={classes.logo_img} />
                </div>
                <Sidebar/>
                <div className={classes.header_right}>
                    <button className={classes.lang_btn} onClick={() => changeLanguage("ru")}>ru</button>
                    {/* <button className={classes.lang_btn} onClick={() => changeLanguage("en")}>en</button> */}
                    <a className={classNames(classes.right_btn, classes.leave_btn)} href="/avn13/logout">
                        Выход
                    </a>
                </div>
            </div>
        </header>
     );
}

export default Header;