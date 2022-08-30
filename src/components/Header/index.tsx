import React from 'react';
import classes from "./Header.module.scss"
import { FaApple, FaArtstation, FaCamera, FaRegCalendarCheck } from "react-icons/fa"
import classNames from 'classnames';
import { useTranslation } from "react-i18next";


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
                <button onClick={() => changeLanguage("ru")}>ru</button>
                <button onClick={() => changeLanguage("en")}>en</button>
                <nav className={classes.header_nav}>
                    <ul className={classes.header_ul}>
                        <li className={classes.header_li}> <FaApple className={classes.header_icon}/> Главная</li>
                        <li className={classNames(classes.header_li, classes.active_li)}> <FaArtstation className={classNames(classes.header_icon,)}/> Дипломники</li>
                        <li className={classes.header_li}> <FaRegCalendarCheck className={classes.header_icon}/> Студенты</li>
                        <li className={classes.header_li}> <FaCamera className={classes.header_icon}/> Пароли</li>
                    </ul>
                </nav>
                <div className={classes.header_right}>
                    <button className={classes.right_btn}>
                        Выход
                    </button>
                </div>
            </div>
        </header>
     );
}

export default Header;