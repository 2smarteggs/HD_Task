import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function (props) {

    const [showDetail, toggleShowDetail] = useState(true);

    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    const handleClick = () => {

        if (showDetail) {
            toggleShowDetail(false);
        } else {
            toggleShowDetail(true);
        }
    };

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    className={classes.media}
                    image={props.logo}
                    title="logo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Expiry: {props.expiryDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={showDetail}>
                        Description: {props.detail.description}<br></br>
                        Require Master Worker: {props.detail.masterWorker}<br></br>
                        Reward Per Response: {props.detail.reward}<br></br>
                        Number Of Workers: {props.detail.numberOfWorker}<br></br>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" hidden={showDetail}>
                        {props.detail.question}<br></br>
                        {props.detail.optionA}<br></br>
                        {props.detail.optionB}<br></br>
                        {props.detail.optionC}<br></br>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}