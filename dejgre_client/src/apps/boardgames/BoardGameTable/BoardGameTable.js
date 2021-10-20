import React from "react";
import { withTranslation } from "react-i18next";
import MaterialTableTrans from "../../../generics/components/MaterialTableTrans";
import { connect } from "react-redux";
import { getBoardGames, postBoardGames, putBoardGames, removeBoardGamesData } from "../store/actions/boardgames";
import { CircularProgress } from "@material-ui/core";

class BoardGameTable extends React.Component {

  componentDidMount() {
    if (!this.props.games?.length)
      this.props.getBoardGames();
  }

  render() {
    const t = this.props.t;
    const loadingValue = this.props.gameLoading * 100; // this will change as more request will appear
    return (
      this.props.gameLoading ?
        <CircularProgress color="secondary"/>
      : <MaterialTableTrans
        columns={[
          {field: "id", title: "#"},
          {field: "name", title: t("boardGamesTable.name")},
          {field: "code", title: t("boardGamesTable.code")},
          {field: "from_age", title: t("boardGamesTable.fromAge")},
          {field: "to_age", title: t("boardGamesTable.toAge")},
          {field: "from_players", title: t("boardGamesTable.fromPlayes")},
          {field: "to_players", title: t("boardGamesTable.toPlayers")},
          {field: "genre", title: t("boardGamesTable.genre")},
          {field: "quantity", title: t("boardGamesTable.quantity")},
          {field: "available", title: t("boardGamesTable.availableQuantity")},
        ]}
        data={this.props.games}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    gameLoading: state.requests.boardGames,
  }
}

const mapDispatchToProps = {
  getBoardGames,
  postBoardGames,
  putBoardGames,
  removeBoardGamesData
};

export default withTranslation(["boardgames"])(connect(mapStateToProps, mapDispatchToProps)(BoardGameTable))