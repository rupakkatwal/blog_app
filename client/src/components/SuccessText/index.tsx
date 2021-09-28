import React from "react";
export interface IErrorTextProps{
    error: string;
}

const  successText: React.FunctionComponent<IErrorTextProps> = props =>{
    const {error} = props;
    if(error === '') return null;
    return<small className = "text success"> {error} </small>
}

export default successText;