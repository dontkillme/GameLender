import React from "react";
import MaterialTable from "material-table";
import tableIcons from "../mtIcons";

export default class MaterialTableTrans extends React.Component {

  onRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      this.props.postAction(newData);
      resolve();
    });
  }

  onRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      this.props.putAction(newData);
      resolve();
    });
  }

  onRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      this.props.deleteAction(oldData.id);
      resolve();
    });
  }

  render() {
    return (
      <MaterialTable 
        icons={tableIcons} 
        options={{
          actionsColumnIndex: -1,
          filtering: true,
          showTitle: this.props.title ?? false
        }}
        editable={{
          onRowAdd: this.onRowAdd,
          onRowUpdate: this.onRowUpdate,
          onRowDelete: this.onRowDelete
        }}
        {...this.props}/>
    );
  }
}