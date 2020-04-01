import React from 'react';
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { authStore } from "../../stores/authStore";
import Alert from '@material-ui/lab/Alert';
import { errorMessage } from "../../constants/Constants";

class LoginScreen extends React.Component {
    
    // Initialization
    state = {
        open: true,
        formHasError: false,
        user: {
            email: '',
            password: '',
        }
    }

    componentDidUpdate() {
        this.formHasError = authStore.loginResponse.get() && authStore.loginResponse.get().ok
    }
    
    // Handle Close dialog box 
    handleClose = () => {
      this.setState({open: false});
    };
    
    // Handle on change form field values
    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    
    // Handle on submit Login Cradentail 
    handleSubmit = async () => {
        await authStore.userLogin(this.state.user);
        const response = authStore.loginResponse.get();
        if(response.ok){
            this.handleClose();
            this.redirectToDevicesSeceen();
        } else {
            console.log(" Submit ", response);
            this.setState({formHasError: true});
            this.setState({
                user: {
                    email: '',
                    password: '',
                }
            })
        }
        return <Redirect to="/devices" push />
    }

    // Render Login Dialog Box
    renderLoginDialogBox = () => {
        const { user } = this.state;
        return (
            <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                <DialogTitle className={this.useStyles.textAlignCenter} id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                        style={{justifyContent:"center", alignItems: "center"}}
                    >
                        {this.state.formHasError && <div style={{paddingBottom: 20}}>
                            <Alert severity="error">{errorMessage.login}</Alert>
                        </div>}
                        {/* Password form field */}
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <EmailIcon />
                            </Grid>
                            <Grid item>
                                <TextValidator
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={user.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Email address field is mandatory.', 'Email address field is not valid']}
                                />
                            </Grid>
                        </Grid>
                        {/* Password form field */}
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <NewReleasesIcon />
                            </Grid>
                            <Grid item>
                                <TextValidator
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    type="password"
                                    validators={['required']}
                                    errorMessages={['Password field is mandatory.']}
                                    value={user.password}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{display: "flex", justifyContent: "center", alignItems: "ctenter", marginTop: 20, marginBottom: 20}}>
                            <Button type="submit" variant="contained" color="primary">
                                LOG IN
                            </Button>
                        </Grid>

                        
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        )
    }

    // Rediect Device Screen
    redirectToDevicesSeceen = () => {
        window.location.reload();
        return <Redirect to="/devices" push />
    }

    render() {
        return this.renderLoginDialogBox();
    }

     // Styling
     useStyles = makeStyles({
        loginButtonWrap: {
          justifyContent: "center",
          padding: 20
        },
        textAlignCenter: {
          justifyContent: "center",
          textAlign: "center"
        }
      });
}

export default observer(LoginScreen);