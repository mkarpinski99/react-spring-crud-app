import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import UserForm from "../users/UserForm";
import axios from "axios";
import {
    Backdrop,
    Box, CircularProgress, makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import FilesDialogTable from "../files/FilesDialogTable";
import AppImageDialog from "../AppImageData/AppImageDialog";
import AppForm from "../apps/AppForm";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
  },
}));



export default function UserView(props){
    const classes = useStyles();
    const [editSelfDialog, setEditSelfDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [appsData, setAppsData] = useState([]);
    const [selectedApp, setSelectedApp] = useState();
    const [showImagesDialog, setShowImagesDialog] = useState();
    const [showFilesDialog, setShowFilesDialog] = useState();
    const [addAppDialog, setAddAppDialog] = useState();

    useEffect( () => {
        fetchUserApps();
    }, [])

    const fetchUserApps = () => {
        axios.get('/api/user/' + localStorage.getItem('id') + '/apps',  {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
            setAppsData(response.data)
        }
    ).catch();
    }

    const fetchCurrentUSer = () => {
        axios.get('/api/user/' + localStorage.getItem('id'),  {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
        .then( response =>{
            setCurrentUser(response.data)
        }
    ).catch();
    }

    const handleEditSelfSubmit = (data) => {
        setLoading(true);
        axios.put('/api/user', {...data, id: localStorage.getItem('id')}, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"}
        })
            .then(response => {
                setEditSelfDialog(false);
                setLoading(false);
                localStorage.setItem("token", '');
                localStorage.setItem("roles", '');
                localStorage.setItem("id", '');
                window.location = "/";
            }).catch(e => setLoading(false));
    }
    const handleDeleteSelfSubmit = () => {
        setLoading(true);
        axios.delete('/api/user/' + localStorage.getItem('id'), {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        }).then(response => {
            setLoading(false);
            localStorage.setItem('token', '');
            window.location = '/';
        }).catch(e => setLoading(false));
    }

    const handleAddAppSubmit = (data) => {
        setLoading(true);
        axios.post('/api/app', {...data},{
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        }).then(response => {
            setLoading(false);
            setAddAppDialog(false);
        }).catch(e => setLoading(false));
    }

    return(
        <>
            <Container>
                <Box m={4}>
                    <Button variant="contained" color="default" onClick={() => setEditSelfDialog(true)}>Edytuj swoje dane</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteSelfSubmit()}>Usuń konto</Button>
                    <Button variant="contained" color="default" onClick={() => setAddAppDialog(true)}>Dodaj aplikację</Button>
                </Box>
            </Container>
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
                                    {/*<Tooltip title="Lokalizacje">*/}
                                    {/*    <Button href={"/appLocations/byApp/" + app.id} variant="contained" color="primary">*/}
                                    {/*        <LocationOnIcon/>*/}
                                    {/*    </Button>*/}
                                    {/*</Tooltip>*/}
                                    <Tooltip title="Pliki">
                                        <Button variant="contained" color="primary" onClick={ e => {
                                            setSelectedApp(app);
                                            setShowFilesDialog(true);
                                        }}>
                                            <DescriptionIcon/>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <UserForm showForm={editSelfDialog}
                     handleSubmit={handleEditSelfSubmit}
                     user={currentUser}
                     handleClose={() => setEditSelfDialog(false)}
                     dialogTitle="Edytuj użytkownika"
            />
            <AppForm showForm={addAppDialog}
                     handleSubmit={handleAddAppSubmit}
                     user={{id: localStorage.getItem('id')}}
                     handleClose={() => setAddAppDialog(false)}
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
    )
}