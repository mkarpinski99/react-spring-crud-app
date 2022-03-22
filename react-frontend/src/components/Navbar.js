import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Box, Button, ButtonGroup} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const [isLogged, setIsLogged] = useState();

    useEffect( () => {
        setIsLogged(localStorage.getItem('token') !== "");
    }, []);

    const adminUI = () => {
        if(isLogged && localStorage.getItem('roles') === "ADMIN"){
            return(
                <>
                    <Button  variant="contained" color="default">
                        <Link href="/users" color="inherit" underline="none">
                            Użytkownicy
                        </Link>
                    </Button>
                    <Button variant="contained" color="default">
                        <Link href="/apps" color="inherit" underline="none">
                            Aplikacje
                        </Link>
                    </Button>
                </>

            )
        }else if(isLogged && localStorage.getItem('roles') === "USER"){

        }else return (
            <>
                <Button variant="contained" color="default">
                    <Link href="/login" color="inherit" underline="none">
                        Logowanie
                    </Link>
                </Button>
                <Button variant="contained" color="default">
                    <Link href="/register" color="inherit" underline="none">
                        Rejestracja
                    </Link>
                </Button>
            </>
        );
    }

    const logout = () => {
        localStorage.setItem("token", "");
        window.location = '/';
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {adminUI()}
                    {localStorage.getItem('token') !== "" ? <Button variant="contained" color="secondary" onClick={logout}>Wyloguj</Button> : ""}
                </Toolbar>
            </AppBar>
        </div>
    );
}