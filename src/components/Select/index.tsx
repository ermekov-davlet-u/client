import Select , { ActionMeta, MultiValue, SingleValue } from "react-select";
import React, { memo } from "react";
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
        options,
        hundleChange,
        value,
        dsbl,
        label
    }:SelectPropType) {

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
    return ( 
        <div className="select_wrap">
            {label && <label className="label" htmlFor="">{ label }</label>}
            <Select isDisabled={!dsbl} className="react-select" classNamePrefix="filter"
                value={value} onChange={hundleChange} options={options} styles={styles} />
        </div>
     );
}

export default memo(UXSelect);