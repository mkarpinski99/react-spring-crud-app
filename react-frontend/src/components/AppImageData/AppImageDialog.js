import React, {useEffect, useState} from 'react'
import {
    Button, ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    GridList,
    GridListTile, GridListTileBar, IconButton, ListSubheader, TextField,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function AppImageDialog(props) {
    const classes = useStyles();
    const [imagesData, setImagesData] = useState([])
    const [url, setUrl] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const fetchImages = () => {
        axios.get('api/appImageData/byApp/' + props.selectedId, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(response => {
                setImagesData(response.data)
            });
    }

    const deleteImage = (id) => {
        axios.delete('api/appImageData/' + id, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(() => fetchImages())
            .catch(e => console.log(e));
    };

    const addImage = (image) => {
        axios.post('api/appImageData/' + props.selectedId, image, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(() => fetchImages())
            .catch(e => console.log(e));
    };

    const updateImage = (image, id) => {
        axios.put('api/appImageData/' + props.selectedId, {...image, id: selectedImage.id}, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
        })
            .then(() => fetchImages())
            .catch(e => console.log(e));
    }

    useEffect(() => {
        fetchImages();
    }, []);

    return(
    <Dialog open={props.showDialog}>
        <DialogTitle>Obrazy aplikacji</DialogTitle>
        <DialogContent>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    addImage({id_app: props.selectedId, image_url: url});
                }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="image_url"
                    label="URL"
                    id="image_url"
                    onChange={event => setUrl(event.target.value)}
                />
                <Button color="primary" variant="contained" type="submit">
                    <AddIcon/>
                </Button>
            </form>
            <div className={classes.root}>
              <GridList>
                {imagesData.map((tile) => (
                  <GridListTile key={tile.id} className={classes.gridList}>
                      <img src={tile.image_url} alt={tile.image_url} />
                    <GridListTileBar
                      actionIcon={
                          <>
                        <IconButton className={classes.icon} onClick={() => {
                            deleteImage(tile.id);
                        }}>
                          <DeleteIcon />
                        </IconButton>
                          <IconButton className={classes.icon} onClick={() => {
                              axios.get('api/appImageData/' + tile.id, {
                                    headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`, "Content-Type" : "application/json"}
                                    }).then(response => setUrl(response.image_url))
                                  .catch(e => console.log(e));
                              setSelectedImage(tile);
                              setShowUpdateDialog(true);
                            }}>
                                <EditIcon/>
                          </IconButton>
                        </>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Anuluj
            </Button>
        </DialogActions>
        <Dialog open={showUpdateDialog}>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    updateImage({image_url: url}, selectedImage.id);
                    setShowUpdateDialog(false);
                }}>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="image_url"
                        label="URL"
                        id="image_url"
                        onChange={event => setUrl(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" type="submit">
                        <PublishIcon/>
                    </Button>
                </DialogActions>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={() => setShowUpdateDialog(false)}>
                        Anuluj
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </Dialog>
    )
}