import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, Grid,
    IconButton,
    Input,
    InputLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, MenuItem, Paper, Select,
    TextField,

} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import axios from "axios";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

export default function FilesDialogTable(props) {
    const [files, setFiles] = useState([]);
    const [id, setId] = useState(props.selectedItem.id);
    const [filterText, setFilterText] = useState(null);
    const [filteredFiles, setFilteredFiles] = useState(files);
    const [value, setValue] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [stats, setStats] = useState({});

    useEffect(() => {
        if(props.byUser){
             fetchFilesByUser(id);
             fetchApps();
             getUserStats(id);
        }else{
            fetchFilesByApp(id);
            fetchUsers();
            getAppStats(id);
        }
    },[]);

    const fetchApps = () => {
        axios.get('/api/app')
            .then(result => {
                setData(result.data);
            })
            .catch(error => console.log(error));

    };

    const getAppStats = (id) => {
      axios.get('/api/app/' + id + '/stats' )
          .then(result => {
              setStats(result.data);
              console.log(stats);
          });
    };

    const getUserStats = (id) => {
      axios.get('/api/user/' + id + '/stats' )
          .then(result => {
              setStats(result.data);
              console.log(stats);
          });
    };

    const fetchUsers = () => {
        axios.get('/api/user').then(result =>
        {
        setData(result.data);
    }).catch(error => console.log(error));
    };

    const fetchFilesByUser = (id) => {
        axios.get("api/user/" + id + "/files")
            .then(result => {
                setFiles(result.data);
                setFilteredFiles(result.data);
            })
            .catch(e => console.log(e));
    }

    const fetchFilesByApp = (id) => {
        axios.get("api/app/" + id + "/files")
            .then(result => {
                setFiles(result.data);
                setFilteredFiles(result.data);
            })
            .catch(e => console.log(e));
    }

    const handleDelete = (item) => {
        axios.delete("api/files/" + item.filename)
            .then(result => {
                props.byUser ? fetchFilesByUser(id) : fetchFilesByApp(id);
            })
            .catch(e => console.log(e));
    }

    return(
        <Dialog open={props.filesDialog} maxWidth="sm" fullWidth={true}>
                <DialogTitle>Pliki {props.byUser ? "użytkownika" : "aplikacji"}</DialogTitle>
                    <DialogContent>
                        <InputLabel id="label">{props.byUser ? "Aplikacja" : "Użytkownik"}</InputLabel>
                                    <Select labelId="label" id="select" onChange={(event) => setSelectedId(event.target.value)} fullWidth>
                                        {
                                            data.map((item) => (
                                                            props.byUser ? <MenuItem value={item.id}>{item.domain + " " + item.name}</MenuItem> : <MenuItem value={item.id}>{item.first_name + " " + item.last_name}</MenuItem>
                                                        ))
                                        }
                                    </Select>
                        <form onSubmit={(event) =>{
                            event.preventDefault();
                            let formData = new FormData();
                            formData.append('file', file);
                            formData.append('user', props.byUser ? id : selectedId);
                            formData.append('app', props.byUser ? selectedId : id);
                            console.log(formData);
                            axios.post("api/files/", formData, {headers: {'content-type': 'multipart/form-data'}})
                                .then(response => props.byUser ? fetchFilesByUser(id) : fetchFilesByApp(id))
                                .catch(e => console.log(e));
                                }}>
                            <FormControl >
                            <InputLabel htmlFor="fileInput">Plik</InputLabel>
                            <Input id="fileInput" type="file" onChange={(e) => {
                                setFile(e.target.files[0])
                                console.log(file);
                            }}/>
                            <Button type="submit">Wyślij</Button>
                        </FormControl>
                        </form>
                        <Autocomplete
                            value={value}
                            id="filesSeach"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                             }}

                            onInputChange={(event, newInputValue) => {
                                setFilterText(filterText);
                                setFilteredFiles(files.filter(f => f.filename.includes(newInputValue)))
                            }}
                            options={files.map((item) => item.filename)}
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
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper>
                                    <Typography variant="h7">
                                        {stats.hasOwnProperty('filesCount') ? "W sumie: " + stats.filesCount : ""}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper>
                                    <Typography variant="h7">
                                        {stats.hasOwnProperty('mostCommonFile') ? "Najczęstsze rozszerzenie: " + stats.mostCommonFile : ""}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Paper elevation={3}>
                            <List>
                                {
                                    filteredFiles.map((item) => (
                                        <ListItem>
                                            <ListItemText>
                                                <Link href={"http://localhost:8080/api/files/" + item.filename}>
                                                    {item.filename}
                                                </Link>
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => {
                                                    handleDelete(item);
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setFilesDialog(false)} color="primary">
                        Anuluj
                    </Button>
                </DialogActions>
            </Dialog>
    )
}