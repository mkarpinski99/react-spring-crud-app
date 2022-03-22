import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import axios from "axios";

export default function UserForm(props) {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return(
    <Dialog open={props.showForm}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Imię"
            id="firstName"
            autoComplete="given-name"
            onChange={event => setFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="secondName"
            label="Nazwisko"
            id="secondName"
            autoComplete="family-name"
            onChange={event => setSecondName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres email"
            name="email"
            autoComplete="email"
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Nazwa użytkownika"
            id="nickname"
            autoComplete="username"
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Anuluj
            </Button>
            <Button onClick={() => props.handleSubmit({first_name: firstName, last_name: secondName, username: username, email: email, password: password})} color="primary">
                Zatwierdź
            </Button>
        </DialogActions>
    </Dialog>
    )
}