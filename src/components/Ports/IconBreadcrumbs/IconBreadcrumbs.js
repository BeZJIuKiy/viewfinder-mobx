import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideocamIcon from '@material-ui/icons/Videocam';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export const IconBreadcrumbs = (props) => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/ports" className={classes.link}>
        <HomeIcon className={classes.icon} />
        ViewFinder
      </Link>
      <Link color="inherit" href="/ports" className={classes.link}>
        <VideocamIcon className={classes.icon}/>
        cameras
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        {/* <AccountCircleIcon className={classes.icon} /> */}
        <ErrorOutlineIcon className={classes.icon} />
        {/* My account */}
        {props.path}
      </Typography>
    </Breadcrumbs>
  );
}