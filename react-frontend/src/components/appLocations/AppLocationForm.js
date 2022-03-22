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

export default function AppLocationForm(props) {
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [country, setCountry] = useState("");



    return(
    <Dialog open={props.showForm}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="Miasto"
            id="city"
            autoComplete="address-level2"
            onChange={event => setCity(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="street"
            label="Ulica"
            id="street"
            autoComplete="address-line1"
            onChange={event => setStreet(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="streetNumber"
            label="Numer ulicy"
            name="streetNumber"
            autoComplete="address-line2"
            onChange={event => setStreetNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="country"
            label="Kraj"
            id="country"
            autoComplete="country"
            onChange={event => setCountry(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Anuluj
            </Button>
            <Button onClick={() => props.handleSubmit({country: country, street: street, street_number: streetNumber, city: city})} color="primary">
                Zatwierdź
            </Button>
        </DialogActions>
    </Dialog>
    )
}