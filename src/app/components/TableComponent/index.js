import React from 'react';
import Constant from "../../constants/constants";
import { Table } from "react-bootstrap";

function TableComponent (props) {
    //preparing the head
    let head = []
    Constant.chartHeader.forEach(itm=>{
        head.push(<th key={itm}>{itm}</th>)
    })
    head = <thead><tr><th key="#"></th>{head}</tr></thead>
    //preaparing the body
    let body = []
    props.data.forEach((itm,index)=>{
        //preparing rows
        let row = [<td key="#">{index+1}</td>];
        itm.forEach(e=>{
            row.push(<td key={e}>{e}</td>)
        })
        //adding the row to the body
        row = <tr key={itm[0]}>{row}</tr>
        body.push(row);
    })
    body = <tbody>{body}</tbody>
    let table = <Table striped bordered hover>{head}{body}</Table>;

    return (
        <div className="chartDiv" id="chartDiv">
            {table};
        </div>
    );
}

export default TableComponent;