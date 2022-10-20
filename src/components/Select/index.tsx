import Select , { ActionMeta, SingleValue } from "react-select";
import React, { memo, useEffect, useRef } from "react";
import { IUniversalSelectType } from './../../store/models/directory';
import "./Select.scss"


type SelectPropType = {
    options: IUniversalSelectType[],
    hundleChange: (newValue: SingleValue< any>, actionMeta: ActionMeta<any> ) => void,
    value: IUniversalSelectType,
    dsbl: boolean;
    label?: string;
}


function UXSelect({ 
        options = [],
        hundleChange,
        value,
        dsbl,
        label
    }:SelectPropType) {
    const selectElem = useRef<any>()
    const styles = {
        option: (provided:any, state: any) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: "#333",
            backgroundColor: "#fff",
            fontSize: state.selectProps.myFontSize
        }),
        singleValue: (provided:any, state: any) => ({
            ...provided,
            color: "#333",
            fontSize: "14px",
            innerHeight: "12px"
        }),
        menu: (base: any) => ({
            ...base,
            zIndex: 100,   
        })
    };
    useEffect(() =>{
        if(options.length){
            // hundleChange(options[0], {
            //     action: "select-option",
            //     name: undefined,
            //     option: options[0]
            // });
        }
        
    }, [ options, dsbl ])
    return ( 
        <div className="select_wrap">
            {label && <label className="label" htmlFor="">{ label }</label>}
            <Select ref={selectElem} onBlur={() => {
                console.log("test");
                
            }} placeholder={"Не выбрано"} isDisabled={!dsbl} className="react-select" classNamePrefix="filter"
                value={value} onChange={hundleChange} options={options} styles={styles} />
        </div>
     );
}

export default memo(UXSelect);