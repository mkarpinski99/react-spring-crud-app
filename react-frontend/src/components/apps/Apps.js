import React, {useState, useEffect} from 'react';
import {
    Backdrop,
    Box,
    Button,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel,
    makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Tooltip
} from "@material-ui/core";
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ImageIcon from '@material-ui/icons/Image';
import AppForm from "./AppForm";
import FilesDialogTable from "../files/FilesDialogTable";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AppImageDialog from "../AppImageData/AppImageDialog";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Apps() {
    const classes = useStyles();
    const [appsData, setAppsData] = useState([]);
    const [updateForm, setUpdateForm] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [usersDialog, setUsersDialog] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [showFilesDialog, setShowFilesDialog] = useState(false);
    const [value, setValue] = useState(null);
    const [appsSearch, setAppsSearch] = useState(appsData);
    const [filterText, setFilterText] = useState(null);
    const [usersAll, setUsersAll] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showImagesDialog, setShowImagesDialog] = useState(false);

    const fetchApps = () => {
        axios.get('/api/app', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setAppsData(result.data);
                setAppsSearch(result.data);
            })
            .catch(error => console.log(error));

    };

    const fetchUsers = (appid) => {
        console.log('/api/user/byApp/' + appid);
        axios.get('/api/user/byApp/' + appid, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setUsersData(result.data);
            })
            .catch(error => console.log(error));
    };
    const fetchUsersAll = () => {
        axios.get('/api/user/', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setUsersAll(result.data);
            })
            .catch(error => console.log(error));
    };

  useEffect(() => {
      fetchApps();
  },[]);

  const handleDelete = (event, appID) => {
      event.preventDefault();
      axios.delete('/api/app/' + appID, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
          .then(response => {
              if(response.status === 200) fetchApps();
              console.log(response.status);
          })
          .catch(e => {
              console.log(e);
          });
    };

  const handleUpdateSubmit = (data) => {
      setLoading(true);
      axios.put('/api/app', {...data, id: selectedApp.id}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setUpdateForm(false);
        setLoading(false);
        fetchApps();
        }
    ).catch(e => setLoading(false));
  };

  const handleAddSubmit = (data) => {
        setLoading(true);
    axios.post('/api/app/', data, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setAddForm(false);
        setLoading(false);
        fetchApps();
        }
    ).catch(e => setLoading(false));
  }

    return (
        <>
        <Box m={4}>
            <Tooltip title="Dodaj aplikację">
                <Button variant="contained" color="primary" onClick={e => {
                    setAddForm(true);
                }}>
                    <AddIcon/>
                </Button>
            </Tooltip>
            <Autocomplete
                value={value}
                id="appsSearch"
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setFilterText(filterText);
                    setAppsData(appsSearch.filter(f => newInputValue.includes(f.domain) && newInputValue.includes(f.name)))
                    console.log(newInputValue);
                    if(newInputValue === "") {
                        fetchApps();
                    }
                }}
                options={appsSearch.map((item) => item.domain + " " + item.name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
                    />
                    )}>
            </Autocomplete>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nazwa</TableCell>
                            <TableCell align="center">Domena</TableCell>
                            <TableCell align="center">Wersja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appsData.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell align="center">{app.name}</TableCell>
                                <TableCell align="center">{app.domain}</TableCell>
                                <TableCell align="center">{app.version}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Obrazy">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedApp(app);
                                            setShowImagesDialog(true);
                                        }}>
                                            <ImageIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Lokalizacje">
                                        <Button href={"/appLocations/byApp/" + app.id} variant="contained" color="primary">
                                            <LocationOnIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Pliki">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedApp(app);
                                            setShowFilesDialog(true);
                                        }}>
                                            <DescriptionIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Użytkownicy">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            fetchUsersAll();
                                            setSelectedApp(app);
                                            fetchUsers(app.id)
                                            setUsersDialog(true);
                                        }}>
                                            <PersonIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Edytuj">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedApp(app);
                                            setUpdateForm(true);
                                        }
                                        }>
                                            <CreateIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Usuń" >
                                        <Button variant="contained" color="secondary" onClick={e => handleDelete(e, app.id)}>
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
            <Dialog open={usersDialog} maxWidth="md">
                <DialogTitle>Użytkownicy aplikacji</DialogTitle>
                    <DialogContent>
                        <InputLabel id="label">Użytkownicy</InputLabel>
                        <Select labelId="label" id="select" onChange={(event) => setSelectedId(event.target.value)}>
                            {
                                usersAll.map((item) => (
                                    <MenuItem value={item.id}>{item.username}</MenuItem>
                                ))
                            }
                        </Select>
                        <Button onClick={() => {
                            axios.post('api/appUser', {id_app: selectedApp.id, id_user: selectedId}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
                                .then(() => fetchUsers(selectedApp.id))
                        }}>Dodaj</Button>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Imię</TableCell>
                                        <TableCell>Nazwisko</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Akcje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersData.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.first_name}</TableCell>
                                            <TableCell>{user.last_name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() =>
                                                    axios.delete("api/appUser/" + selectedApp.id + "/" + user.id, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
                                                        .then( response => {
                                                                fetchUsers(selectedApp.id);
                                                            }
                                                        ).catch(e => console.log(e))
                                                }>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUsersDialog(false)} color="primary">
                        Anuluj
                    </Button>
                </DialogActions>
            </Dialog>
            <AppForm showForm={updateForm}
                     handleSubmit={handleUpdateSubmit}
                     app={selectedApp}
                     handleClose={() => setUpdateForm(false)}
                     dialogTitle="Edytuj aplikację"
            />
            <AppForm showForm={addForm}
                     handleSubmit={handleAddSubmit}
                     app={selectedApp}
                     handleClose={() => setAddForm(false)}
                     dialogTitle="Dodaj aplikację"
            />
            {showFilesDialog ? <><FilesDialogTable byUser={false}
                              filesDialog={showFilesDialog}
                              setFilesDialog={setShowFilesDialog}
                              selectedItem={selectedApp}
            /></> : ""}
            {showImagesDialog ? <><AppImageDialog showDialog={showImagesDialog} handleClose={() => setShowImagesDialog(false)}
            selectedId={selectedApp.id}/></> : ""}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress />
            </Backdrop>
            </>
    );
}