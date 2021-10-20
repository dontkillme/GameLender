import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { withTranslation } from "react-i18next";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { withRouter } from 'react-router';
import axiosRequests from "../../../generics/axiosShortcuts";
import { TitleBar } from "../../../generics/colors";
import { Link } from "react-router-dom"

class NavBar extends React.Component {
  state = {
    showMenu: false,
    menuTarget: null
  }
  
  onClickMenu = (e) => {
    this.setState({ showMenu: true, menuTarget: e.currentTarget });
  }

  onCloseMenu = () => {
    this.setState({ showMenu: false, menuTarget: null });
  }

  onProfileClick = (e) => {
    this.props.history.push("/profile/");
  }

  onLogOut = (e) => {
    axiosRequests.get("/logout/").then(() => {
      axiosRequests.removeAuthToken();
      this.props.loginRefresh(false);
    });
  }

  render() {
    const t = this.props.t;

    return (
      <AppBar position="sticky" style={{ background: TitleBar }}>
        <Link to="/boardgames">Board games</Link>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.onClickMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.menuTarget}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.showMenu}
            onClose={this.onCloseMenu}
          >
            <MenuItem onClick={this.onProfileClick}>{t("nav.profile")}</MenuItem>
            <MenuItem onClick={this.onLogOut}>{t("nav.logOut")}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    ); 
  }
}

export default withTranslation(["dashboard"])(withRouter(NavBar));