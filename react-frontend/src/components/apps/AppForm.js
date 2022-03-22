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

export default function AppForm(props) {
    const [name, setName] = useState(null);
    const [domain, setDomain] = useState(null);
    const [version, setVersion] = useState(null);

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
                label="Nazwa"
                id="name"
                error=""
                onChange={event => setName(event.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="domain"
                label="Domena"
                id="domain"
                onChange={event => setDomain(event.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="version"
                label="Wersja"
                name="version"
                onChange={event => setVersion(event.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Anuluj
            </Button>
            <Button onClick={() => props.handleSubmit({name: name, domain: domain, version: version})} color="primary">
                Zatwierdź
            </Button>
        </DialogActions>
    </Dialog>
    )
}