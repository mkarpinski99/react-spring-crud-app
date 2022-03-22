import React, {useState, useEffect} from 'react';
import {
    Backdrop,
    Box,
    Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel,
    makeStyles, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Tooltip
} from "@material-ui/core";
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import DescriptionIcon from '@material-ui/icons/Description';
import UserForm from "./UserForm";
import AddIcon from "@material-ui/icons/Add";
import FilesDialogTable from "../files/FilesDialogTable";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Users(props) {
    const classes = useStyles();
    const [usersData, setUsersData] = useState([]);
    const [updateForm, setUpdateForm] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [appsDialog, setAppsDialog] = useState(false);
    const [appsData, setAppsData] = useState([]);
    const [showFilesDialog, setShowFilesDialog] = useState(false);
    const [value, setValue] = useState(null);
    const [usersSearch, setUsersSearch] = useState(usersData);
    const [filterText, setFilterText] = useState(null);
    const [appsAll, setAppsAll] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const fetchUsers = () => {
        axios.get('/api/user', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        }).then(result =>
        {
        setUsersData(result.data);
        setUsersSearch(result.data);
    }).catch(error => console.log(error));
    };

    const fetchApps = (userid) => {
        axios.get('/api/user/' + userid + '/apps', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setAppsData(result.data);
            })
            .catch(error => console.log(error));
    }

    const fetchAppsAll = () => {
        axios.get('/api/app', {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(result => {
                setAppsAll(result.data);
            })
            .catch(error => console.log(error));
    }

  useEffect(() => {
      fetchUsers();
  },[]);

  const handleDelete = (event, userID) => {
      event.preventDefault();
      axios.delete('/api/user/' + userID, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
          .then(response => {
              if(response.status === 200) fetchUsers();
          })
          .catch(e => {
              console.log(e);
          });
    }

  const handleUpdateSubmit = (data) => {
      setLoading(true);
      axios.put('/api/user', {...data, id: selectedUser.id}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setUpdateForm(false);
        setLoading(false);
        fetchUsers();
        }
    ).catch(e => setLoading(false));
    };

    const handleAddSubmit = (data) => {
        setLoading(true);
    axios.post('/api/user', data, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
        setAddForm(false);
        setLoading(false);
        fetchUsers();
        }
    ).catch(e => setLoading(false));
  }

    return (
        <>
        <Box m={4}>
            <Tooltip title="Dodaj administratora">
                <Button variant="contained" color="primary" onClick={e => {
                    setAddForm(true);
                }}>
                    <AddIcon/>
                </Button>
            </Tooltip>
            <Autocomplete
                value={value}
                id="usersSearch"
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setFilterText(filterText);
                    setUsersData(usersSearch.filter(f => newInputValue.includes(f.first_name) && newInputValue.includes(f.last_name)))
                    console.log(newInputValue);
                    if(newInputValue === "") {
                        fetchUsers();
                    }
                }}
                options={usersSearch.map((item) => item.first_name + " " + item.last_name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined"/>}
                    />
                    )}>
            </Autocomplete>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" style={{margin: 'auto'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Imię</TableCell>
                            <TableCell align="center">Nazwisko</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Nazwa użytkownika</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell align="center">{user.first_name}</TableCell>
                                <TableCell align="center">{user.last_name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Pliki">
                                        <Button variant="contained" color="primary" onClick={e => {
                                            setSelectedUser(user);
                                            setShowFilesDialog(true);
                                        }}>
                                            <DescriptionIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Aplikacje">
                                        <Button variant="contained" color="primary" onClick={e => {
                                            fetchAppsAll();
                                            setSelectedUser(user);
                                            fetchApps(user.id);
                                            setAppsDialog(true);
                                        }}>
                                            <ListIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Edytuj">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedUser(user);
                                            setUpdateForm(true);
                                        }}>
                                            <CreateIcon/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Usuń">
                                        <Button variant="contained" color="secondary" onClick={e => handleDelete(e, user.id)}>
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
            <Dialog open={appsDialog} maxWidth="md">
                <DialogTitle>Aplikacje użytkownika</DialogTitle>
                    <DialogContent>
                        <InputLabel id="label">Aplikacje</InputLabel>
                        <Select labelId="label" id="select" onChange={(event) => setSelectedId(event.target.value)}>
                            {
                                appsAll.map((item) => (
                                    <MenuItem value={item.id}>{item.domain}</MenuItem>
                                ))
                            }
                        </Select>
                        <Button onClick={() => {
                            axios.post('api/user/' + selectedUser.id + '/addApp/' + selectedId, {}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
                                .then(() => fetchApps(selectedUser.id))
                        }}>Dodaj</Button>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell>Domena</TableCell>
                                        <TableCell>Wersja</TableCell>
                                        <TableCell>Akcje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appsData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.domain}</TableCell>
                                            <TableCell>{item.version}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() =>
                                                    axios.delete("api/appUser/" + item.id + "/" + selectedUser.id, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
                                                        .then( response => {
                                                                console.log(selectedUser.id);
                                                                fetchApps(selectedUser.id);
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
                    <Button onClick={() => setAppsDialog(false)} color="primary">
                        Anuluj
                    </Button>
                </DialogActions>
            </Dialog>
            <UserForm showForm={updateForm}
                     handleSubmit={handleUpdateSubmit}
                     user={selectedUser}
                     handleClose={() => setUpdateForm(false)}
                     dialogTitle="Edytuj użytkownika"
            />
            <UserForm showForm={addForm}
                     handleSubmit={handleAddSubmit}
                     user={selectedUser}
                     handleClose={() => setAddForm(false)}
                     dialogTitle="Dodaj administratora"
            />
            {showFilesDialog ? <><FilesDialogTable byUser={true}
                              filesDialog={showFilesDialog}
                              setFilesDialog={setShowFilesDialog}
                              selectedItem={selectedUser}
                              data={appsData}
            /></> : ""}

            <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress />
            </Backdrop>
    </>
    );
}