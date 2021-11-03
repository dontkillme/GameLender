import { Tabs, Tab } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import React from "react";
import BoardGameTable from "./BoardGameTable/BoardGameTable";
import GenreTable from "./BoardGameGenre/GenreTable";

class BoardGameView extends React.Component {
  state = {
    openTab: 0,
  };

  changeTab = (e, newValue) => {
    this.setState({openTab: newValue});
  }

  render() {
    const t = this.props.t;

    return (
      <div>
        <Tabs value={this.state.openTab} onChange={this.changeTab}>
          <Tab label={t("main.boardGames")} value={0}/>
          <Tab label={t("main.genre")} value={1}/>
        </Tabs>
        {this.state.openTab === 0 && <div>
          <BoardGameTable />
        </div>}
        {this.state.openTab === 1 && <div>
          <GenreTable />
        </div>}
      </div>
    )
  }
}

export default withTranslation(["boardgames"])(BoardGameView);