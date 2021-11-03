import React from "react";
import { withTranslation } from "react-i18next";
import MaterialTableTrans from "../../../generics/components/MaterialTableTrans";
import { connect } from "react-redux";
import { getBoardGames, postBoardGames, putBoardGames, deleteBoardGames } from "../store/actions/boardgames";
import { getGenre } from "../store/actions/genre";
import PlusOneIcon from '@mui/icons-material/PlusOne';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LendModal from "./modals/LendModal";
import LendListModal from "./modals/LendListModal";

class BoardGameTable extends React.Component {

  state = {
    showLendModal: false,
    showLendedModal: false,
    currentRow: null
  }

  componentDidMount() {
    if (!this.props.games?.length)
      this.props.getBoardGames();
    if (!Object.keys(this.props.genre).length)
      this.props.getGenre();
  }

  createGenreLookup() {
    return Object.fromEntries(this.props.genre.map(item => [item.id, item.name]));
  }

  onLendClick = (e, rowData) => {
    this.setState({showLendModal: true, currentRow: rowData});
  }

  onLendedClick = (e, rowData) => {
    this.setState({showLendedModal: true, currentRow: rowData});
  }
  
  onCloseDialog = () => {
    this.setState({showLendModal: false, currentRow: null, showLendedModal: false});
  }
  
  render() {
    const t = this.props.t;
    const loadingValue = this.props.gameLoading * 100; // this will change as more request will appear
    return (
      <>
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
            {field: "genre", title: t("boardGamesTable.genre"), lookup: this.createGenreLookup()},
            {field: "quantity", title: t("boardGamesTable.quantity"), type: "numeric"},
            {field: "available", title: t("boardGamesTable.availableQuantity"), editable: "never"},
          ]}
          data={this.props.games}
          putAction={this.props.putBoardGames}
          postAction={this.props.postBoardGames}
          deleteAction={this.props.deleteBoardGames}
          actions={[
            {
              icon: PlusOneIcon,
              onClick: this.onLendClick
            },
            {
              icon: MenuBookIcon,
              onClick: this.onLendedClick
            }
          ]}
        />
        { this.state.showLendModal && <LendModal 
          onClose={this.onCloseDialog}
          open={this.state.showLendModal}
          game={this.state.currentRow}
        />}
        { this.state.showLendedModal && <LendListModal
          onClose={this.onCloseDialog}
          open={this.state.showLendedModal}
          game={this.state.currentRow}
        />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.boardGames.boardGames,
    gameLoading: state.requests.boardGames,
    genre: state.boardGames.genre
  }
}

const mapDispatchToProps = {
  getGenre,
  getBoardGames,
  postBoardGames,
  putBoardGames,
  deleteBoardGames
};

export default withTranslation(["boardgames"])(connect(mapStateToProps, mapDispatchToProps)(BoardGameTable))