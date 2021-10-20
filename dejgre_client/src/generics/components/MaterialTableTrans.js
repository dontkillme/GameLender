import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../mtIcons";

export default function MaterialTableTrans(props) {
  return (<MaterialTable icons={tableIcons} {...props}/>);
}