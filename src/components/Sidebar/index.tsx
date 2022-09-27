import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import classes from "./Sidebar.module.scss" 


function Sidebar() {

  const { diplom, journal } = useAppSelector(state => state.dostup)

    return ( 
        <div className={classes.menu}>
            <div className={classes.container}>
              <NavLink style={({ isActive }) => {
                return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "black" : "",
                    borderBottom: isActive ? "2px solid black" : "",
                  };
                }} className={classes.menu_item} to="/avn13/">Список оценок</NavLink>
              <NavLink style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "black" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                    };
                  }} className={classes.menu_item} to="/avn13/log-pass">Студенты</NavLink>
              <NavLink style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "black" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                    };
                  }} className={classes.menu_item} to="/avn13/stud-grade">Обработка оценки студентов</NavLink>
              {
                  diplom && <NavLink style={({ isActive }) => {
                    return {
                      display: "block",
                      margin: "1rem 0",
                      color: isActive ? "black" : "",
                      borderBottom: isActive ? "2px solid black" : "",
                        };
                      }} className={classes.menu_item} to="/avn13/diplom">Диплом</NavLink>
              }
              
              {
                journal && <NavLink style={({ isActive }) => {
                  return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "black" : "",
                      };
                    }} className={classes.menu_item} to="/avn13/journal">Журнал</NavLink>
              }
            </div>
        </div>
     );
}

export default Sidebar;