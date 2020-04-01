import React from 'react';
import Button from '@material-ui/core/Button';
import { isAuthenticated } from "../stores/commonStore";
import { authStore } from "../stores/authStore";
import { Redirect } from "react-router-dom";

const onLogout = (timer) => {
  authStore.userLogout();
  redirectLoginSeceen()
};

  // Rediect Device Screen
const redirectLoginSeceen = () => {
    window.location.reload();
    return <Redirect to="/login" push />
}

const onNotifyMe = () => {
  // TODO:  Need further improvment to display approriate screen
  alert(' Taks has been completed!')
}

const LoggedInView = props => {
    return (
      <div style={{backgroundColor: "#D76844", paddingTop: 20, paddingBottom: 20, height: 40, justifyContent:"center", width: "100%"}}>
        <Button variant="contained" size="medium" style={{backgroundColor: "#fff", color: "#36474F", marginRight: 20}} onClick={() => onNotifyMe()}>Notify</Button>
        <Button variant="contained" size="medium" style={{backgroundColor: "#36474F", color: "#fff"}}  onClick={() => onLogout()}>Logout</Button>
      </div>
    );
};

const Footer = () => {
    return (
          isAuthenticated.get() && <LoggedInView />
    );
}

export default Footer;