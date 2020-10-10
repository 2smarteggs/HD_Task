import React, {useState} from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import No from '@material-ui/icons/Clear';
import Yes from '@material-ui/icons/Done';


export default function LabeledImage(props) {

    const [showEdit, toggleShowEdit] = useState(true);

    const handleEdit = () => {
        if (showEdit === true) {
            toggleShowEdit(false)
        } else {
            toggleShowEdit(true)
        }
    };

    const handleClick = () => {
        alert('Change saved.');
        toggleShowEdit(true)
    };

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            minWidth: 300,
            minHeight: 140
        },
        media: {
            minHeight: 140
        },
    });
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        onClick={handleEdit}
                        className={classes.media}
                        image={props.logo}
                        title="logo"
                    />
                    <CardContent>
                        {(props.labels).map((value) => (
                            <div>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <h5>{value.value}</h5>
                                    <a>{value.confidence + '%'}</a>
                                </Typography>
                            </div>
                        ))}
                        <Typography gutterBottom variant="h5" component="h2" hidden={showEdit} style={{textAlign: 'center', marginTop: '5%'}}>
                            <Fab color="secondary" aria-label="edit" onClick={handleClick} style={{marginRight: '10%'}}>
                                <No />
                            </Fab>
                            <Fab color="primary" aria-label="edit" onClick={handleClick} style={{marginLeft: '10%'}}>
                                <Yes />
                            </Fab>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

