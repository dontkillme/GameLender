import React from "react";
import MaterialTableTrans from "../../../generics/components/MaterialTableTrans";
import { getGenre, postGenre, putGenre, deleteGenre } from "../store/actions/genre";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";


class GenreTable extends React.Component {

  componentDidMount() {
    if (!Object.keys(this.props.genre).length) {
      this.props.getGenre();
    }
  }

  render() {
    const t = this.props.t;

    return (
      <MaterialTableTrans
        title={t("genre.tableTitle")}
        data={Object.values(this.props.genre)}
        columns={[
          {field: "id", title: "#", editable: false},
          {field: "name", title: t("genre.name")}
        ]}
        putAction={this.props.putGenre}
        postAction={this.props.postGenre}
        deleteAction={this.props.deleteGenre}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genre: state.boardGames.genre,
    genreLoading: state.requests.genre,
  }
}

const mapDispatchToProps = {
  getGenre,
  putGenre,
  postGenre,
  deleteGenre
};

export default withTranslation(["boardgames"])(connect(mapStateToProps, mapDispatchToProps)(GenreTable))