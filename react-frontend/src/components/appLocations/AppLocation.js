import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tooltip
} from "@material-ui/core";
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AppLocationForm from "./AppLocationForm";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
}));


export default function AppLocation(props) {
    const classes = useStyles();
    const [appLocationData, setAppLocationData] = useState([]);
    const [updateForm, setUpdateForm] = useState(false);
    const [selectedAppLocation, setSelectedAppLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(props.match.params);


    const fetchAppLocations = () => {
        console.log(selectedAppId.id);
        axios.get('/api/app/' + selectedAppId.id + '/appLocations', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setAppLocationData(result.data);
            })
            .catch(error => console.log(error));
    };

  useEffect(() => {
      fetchAppLocations();
  },[]);

  const handleDelete = (event, appLocationID) => {
      event.preventDefault();
      axios.delete('/api/appLocation/' + appLocationID, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
          .then(response => {
              if(response.status === 200) fetchAppLocations();
          })
          .catch(e => {
              console.log(e);
          });
    };

  const handleUpdateSubmit = (data) => {
      setLoading(true);
      axios.put('/api/appLocation/' + selectedAppId.id, {...data, id: selectedAppLocation.id}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setUpdateForm(false);
        setLoading(false);
        fetchAppLocations();
        }
    ).catch(e => setLoading(false));
  };

  const handleAddSubmit = (data) => {
        setLoading(true);
    axios.post('/api/appLocation/' + selectedAppId.id, data, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setAddForm(false);
        setLoading(false);
        fetchAppLocations();
        }
    ).catch(e => setLoading(false));
  }

    return (
        <>
        <Box m={4}>
            <Tooltip title="Dodaj lokalizację">
                <Button variant="contained" color="primary" onClick={e => {
                    setAddForm(true);
                }}>
                    <AddIcon/>
                </Button>
            </Tooltip>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Kraj</TableCell>
                            <TableCell align="center">Miasto</TableCell>
                            <TableCell align="center">Ulica</TableCell>
                            <TableCell align="center">Nr ulicy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appLocationData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell align="center">{item.country}</TableCell>
                                <TableCell align="center">{item.city}</TableCell>
                                <TableCell align="center">{item.street}</TableCell>
                                <TableCell align="center">{item.street_number}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edytuj">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedAppLocation(item);
                                            setUpdateForm(true);
                                        }}>
                                            <CreateIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Usuń" >
                                        <Button variant="contained" color="secondary" onClick={e => handleDelete(e, item.id)}>
                                            <DeleteIcon/>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
            <AppLocationForm showForm={updateForm}
                     handleSubmit={handleUpdateSubmit}
                     app={selectedAppLocation}
                     handleClose={() => setUpdateForm(false)}
                     dialogTitle="Edytuj lokalizację aplikację"
            />
            <AppLocationForm showForm={addForm}
                     handleSubmit={handleAddSubmit}
                     app={selectedAppLocation}
                     handleClose={() => setAddForm(false)}
                     dialogTitle="Dodaj lokalizację aplikację"
            />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress />
            </Backdrop>
            </>
    );
}