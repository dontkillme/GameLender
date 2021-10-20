import React from "react";
import { withTranslation } from "react-i18next";
import MaterialTableTrans from "../../../generics/components/MaterialTableTrans";
import { connect } from "react-redux";
import { getBoardGames, postBoardGames, putBoardGames, deleteBoardGames } from "../store/actions/boardgames";
import { CircularProgress } from "@material-ui/core";

class BoardGameTable extends React.Component {

  componentDidMount() {
    if (!this.props.games?.length)
      this.props.getBoardGames();
  }

  onRowAdd = (newData) => {
    return new Promise((resolve, reject) => {
      this.props.postBoardGames(newData);
      resolve();
    });
  }

  onRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      this.props.putBoardGames(newData);
      resolve();
    });
  }

  onRowDelete = (oldData) => {
    return new Promise((resolve, reject) => {
      this.props.deleteBoardGames(oldData.id);
      resolve();
    });
  }

  render() {
    const t = this.props.t;
    const loadingValue = this.props.gameLoading * 100; // this will change as more request will appear
    return (
      <MaterialTableTrans
        isLoading={this.props.gameLoading}
        columns={[
          {field: "id", title: "#", editable: "never"},
          {field: "name", title: t("boardGamesTable.name")},
          {field: "code", title: t("boardGamesTable.code")},
          {field: "from_age", title: t("boardGamesTable.fromAge"), type: "numeric"},
          {field: "to_age", title: t("boardGamesTable.toAge"), type: "numeric"},
          {field: "from_players", title: t("boardGamesTable.fromPlayers"), type: "numeric"},
          {field: "to_players", title: t("boardGamesTable.toPlayers"), type: "numeric"},
          {field: "genre", title: t("boardGamesTable.genre"), editable: "never"}, // will change to select
          {field: "quantity", title: t("boardGamesTable.quantity"), type: "numeric"},
          {field: "available", title: t("boardGamesTable.availableQuantity"), editable: "never"},
        ]}
        data={this.props.games}
        options={{
          actionsColumnIndex: -1,
          filtering: true,
        }}
        editable={{
          onRowAdd: this.onRowAdd,
          onRowUpdate: this.onRowUpdate,
          onRowDelete: this.onRowDelete
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.boardGames.boardGames,
    gameLoading: state.requests.boardGames,
  }
}

const mapDispatchToProps = {
  getBoardGames,
  postBoardGames,
  putBoardGames,
  deleteBoardGames
};

export default withTranslation(["boardgames"])(connect(mapStateToProps, mapDispatchToProps)(BoardGameTable))