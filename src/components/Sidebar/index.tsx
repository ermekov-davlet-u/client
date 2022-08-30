import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from "./Sidebar.module.scss" 


function Sidebar() {
    return ( 
        <div className={classes.menu}>
            <div className={classes.container}>
                <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "black" : "",
              };
            }} className={classes.menu_item} to="/">Список оценок</NavLink>
                <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "black" : "",
              };
            }} className={classes.menu_item} to="log-pass">Студенты</NavLink>
            <NavLink style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "black" : "",
              };
            }} className={classes.menu_item} to="stud-grade">Обработка оценки студентов</NavLink>
            </div>
        </div>
     );
}

export default Sidebar;