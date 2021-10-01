import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import backgroundImage from "../Auth/images/backgroundNew.jpg"
import {observer} from "mobx-react-lite";
import Grid from "@material-ui/core/Grid";
import {Header} from "./Header/Header";
import {Container, Hidden} from "@material-ui/core";
// import {Drawer} from "./Drawer/Drawer";
import styles from "../../store/styles";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';
import account from "../../store/account";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {useHexToRgba} from "../../useHooks/useHexToRgba";
import ports from "../../store/ports";
import {AccountTable} from "./Account30/Items/AccountTable";
import {BoatEvents} from "./Events/BoatEvents";
import {useWindowDimensions} from "../../useHooks/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
    test: {
        // width: "100%",
        // height: "100%",

        minWidth: "100%",
        minHeight: "100%",
    },

    container: {
        // display: "flex",
        // height: 500,
        // color: "white",
        // fontSize: "2.6em",
        // flexFlow: "column wrap",    // Расположение в виде колонок

        // display: "flex",
        // flexWrap: "wrap",
        // padding: 0,
        // margin: 0,
        // listStyle: "none",

        display: "flex",
        // flexFlow: "row wrap",
        maxWidth: 1200,
        marginTop: 10,
        margin: "0 auto",
    },

    item01: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",


        "&.one": {
            backgroundColor: "#508694",
            marginRight: 10,
            flexBasis: "100%",
            order: 1, // Первый блок
        },

        "&.two": {
            backgroundColor: "#BB844C",
            marginBottom: 10,
            flex: "1 1 0",
            order: 2, // Второй блок
        },

        "&.three": {
            backgroundColor: "#929D79",
            flex: "1 1 0",
            order: 3, // Третий блок
        },

        "&.four": {
            backgroundColor: "#929D79",
            flexBasis: "100%",
            margin: "0 10px",
            order: 4, // Четвертый блок
        },

        "&.five": {
            backgroundColor: "#929D79",
            marginBottom: 10,
            flex: "1 1 0",
            order: 5, // Пятый блок
        },

        "&.six": {
            backgroundColor: "#929D79",
            marginBottom: 10,
            flex: "1 1 0",
            order: 6, // Шестой блок
        },

        "&.seven": {
            backgroundColor: "#929D79",
            // marginTop: 10,
            flex: "1 1 0",
            order: 7, // Седьмой блок
        },
    },
    item02: {
        flex: "1 1 0",

        padding: 100,
        background: "#f0f0f0",
        borderRadius: 5,
        margin: "1rem",
        textAlign: "center",
    },

    item03: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        backgroundColor: "#508694",

        borderRadius: 16,
        boxShadow: "0 0 2px 0 rgba(145, 158, 171, 0.24),0 16px 32px -4px rgba(145, 158, 171, 0.24)",

        "&.one": {
            height: 200,

            backgroundColor: "#508694",
            marginRight: 10,
            flex: "1 1 0",
            order: 1, // Первый блок
        },

        "&.two": {
            height: 200,

            backgroundColor: "#508694",
            marginRight: 10,
            flex: "1 1 0",
            order: 2, // Первый блок
        },

        "&.three": {
            height: 200,

            backgroundColor: "#508694",
            marginRight: 10,
            flex: "1 1 0",
            order: 3, // Первый блок
        },

        "&.four": {
            height: 200,

            backgroundColor: "#508694",
            marginBottom: 10,
            flex: "1 1 0",
            order: 4, // Первый блок
        },

        "&.five": {
            // width: 1000,
            height: 300,

            backgroundColor: "#333",
            marginBottom: 10,
            // flexBasis: "80%",

            // flex: "1 1 80%",
            order: 5, // Первый блок
        },

        "&.six": {
            height: 200,

            backgroundColor: "#508694",
            marginBottom: 10,
            flex: "1 1 0",
            order: 6, // Первый блок
        },
        "&.eight": {
            height: 300,

            backgroundColor: "#e5e5e5",
            marginBottom: 10,
            flex: "1 1 0",
            order: 6, // Первый блок
        },
    },

    container01: {
        display: "flex",
        flexFlow: "column wrap",
    },
    item04: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "&._01": {
            backgroundColor: "red",
            flexBasis: "100%",
            marginRight: 10,
            order: 1,
        },

        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "100%",
        "&._02": {
            backgroundColor: "#777",
            flex: "1 1 0",
            marginBottom: 5,
            order: 2,
        },

        "&._03": {
            backgroundColor: "gold",
            flex: "1 1 0",
            marginTop: 5,
            order: 3,
        },

        "&._04": {
            backgroundColor: "blue",
            flexBasis: "100%",
            marginLeft: 10,
            order: 4,
        },
    },

    container02: {
        display: "flex",
        flexWrap: "wrap",
    },
    item05: {
        padding: 100,
        backgroundColor: "gold",
        textAlign: "center",

        "&.five": {
            height: 150,
            backgroundColor: "red",
        },

        "&.six": {
            height: 250,
            backgroundColor: "blue",
        },
    },


    main: {
        width: "100%",
        height: "100%",

        display: "flex",
        fontFamily: `"Quicksand", sans-serif`,

        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    leftHalf: {
        width: "50%",

        position: "relative",
        background: "rgba(51, 51, 51, 0.7)",

        "@media(max-width: 425px)": {
            width: "100%",
        }
    },
    gridContainer: {
        // textAlign: "center",

        position: "absolute",
        top: "50%",
        left: "0px",
        zIndex: 1,

        transform: "translate(0, -50%)",
    },
    gridItem: {
        fontFamily: `"Quicksand", sans-serif`,

        color: "#ddd",
        borderColor: "none",
        fontSize: 24,

        // marginBottom: theme.spacing(2),

        "&.title": {
            textAlign: "center",
            fontSize: 52,
            fontWeight: 300,
        },

        "&.demo": {
            width: "100%",
            // width: "10vw",
            maxWidth: "200px",
            marginLeft: "auto",
            backgroundColor: "#9e2b4b",

            "&:hover": {
                backgroundColor: "#e22157",
            }
        },

        "&.login": {
            width: "100%",
            // width: "10vw",
            maxWidth: "200px",
            marginRight: "auto",
            backgroundColor: "#3d4772",

            "&:hover": {
                backgroundColor: "#374fb9",
            }
        },
    },
}));

const usePersonalInfoMobileStyles = makeStyles((theme) => ({
    mobilePersonalInfo: {
        display: "flex",

        width: "100%",
    },
    mobilePersonalInfoAvatar: {
        display: "flex",

        minWidth: 130,
        minHeight: 130,

        borderRadius: "50%",

        backgroundImage: `url(${account.personalInformation.avatar})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    mobilePersonalInfoData: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",

        width: "100%",
        textAlign: "left",
        paddingLeft: 20,
        margin: "0 5px",

        overflowX: "auto",
    },
    mobilePersonalInfoDataItem: {
        fontSize: "4vw",
        fontWeight: 500,

        "&.name": {
            fontSize: "5vw",
            fontWeight: 700,
        },

        "&.filed": {
            color: "#666",
            fontSize: "2.8vw",
            textTransform: "uppercase",
        },
        "&.data": {
            color: "#333",
            fontWeight: 700,
            textTransform: "uppercase",
        },
    },
}))
const PersonalInfoMobile = observer(() => {
    const classes = usePersonalInfoMobileStyles();
    const {name, company, status, balance} = account.personalInformation;

    return (
        <div className={classes.mobilePersonalInfo}>
            <div className={classes.mobilePersonalInfoAvatar}/>
            <div className={classes.mobilePersonalInfoData}>
                <div className={`${classes.mobilePersonalInfoDataItem} name`}>{name.first} {name.last}</div>
                <div className={classes.mobilePersonalInfoDataItem}>{company}</div>
                <div className={`${classes.mobilePersonalInfoDataItem} filed`}>COUNTRY: <span
                    className={`${classes.mobilePersonalInfoDataItem} data`}>${balance}</span></div>
                <div className={`${classes.mobilePersonalInfoDataItem} filed`}>
                    Status: <span className={`${classes.mobilePersonalInfoDataItem} data`}>{status}</span>
                </div>
            </div>
        </div>
    )
});

const usePersonalInformationStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: 10,
    },
    desktopPersonalInfo: {
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        textAlign: "left",
    },
    avatar: {
        width: "16vw",
        // width: "100%",
        height: "100%",

        minWidth: 150,
        minHeight: 200,
        margin: "10px 0px",
    },
    heading: {
        fontSize: theme.typography.pxToRem(11),
        flexBasis: '33.33%',
        flexShrink: 0,

        fontFamily: styles.fontFamily,
        fontWeight: 600,
        color: theme.palette.text.secondary,
        textTransform: "uppercase",

        margin: "auto 0",
    },
    secondaryHeading: {
        marginLeft: "-12%",

        fontFamily: styles.fontFamily,
        fontWeight: 600,
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary,
    },
    text: {
        fontFamily: styles.fontFamily,
        fontWeight: 500,
    },
    accordion: {
        width: "100%",
        background: "inherit",
    },
    quickPay: {
        width: "100%",

        display: "flex",
        justifyContent: "center",
        background: "inherit",
    },
    btn: {
        width: "5vw",
        margin: "0px 3px",
        fontFamily: styles.fontFamily,
        fontWeight: 500,
    },

    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,
    }
}))
const PersonalInformation = observer(() => {
    const classes = usePersonalInformationStyles();

    const {avatar, name} = account.personalInformation;

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const persInfoAccordion = () => {
        const personalInfo = [];

        for (const key in account.personalInformation) {
            if (key === "avatar" || key === "firstName" || key === "secondName") continue;

            personalInfo.push(
                <Accordion key={`personalInfo-${key}`} className={classes.accordion} expanded={expanded === key}
                           onChange={handleChange(key)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading} component={'span'}>{key}</Typography>
                        <Typography
                            className={classes.secondaryHeading}
                            component={'span'}
                        >
                            {key === "name"
                                ? `${name.first} ${name.last}`
                                : account.personalInformation[key]}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography className={classes.text} component={'span'}>
                            {persInfoAccordionActions(key)}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        }

        return personalInfo;
    };
    const persInfoAccordionActions = (name) => {
        switch (name) {
            case "name": {
                return (
                    <div>
                        change first and last name
                    </div>
                )
            }

            case "company": {
                return (
                    <div>
                        change company name
                    </div>
                )
            }

            case "phone": {
                return (
                    <div>
                        change phone number
                    </div>
                )
            }

            case "email": {
                return (
                    <div>
                        change email
                    </div>
                )
            }

            default: {
                return "";
            }
        }
    }
    const quickPay = () => {
        const lastPays = [];
        for (let i = account.payHistory.length - 1; i > account.payHistory.length - 4; --i) {
            lastPays.push(account.payHistory[i]);
        }

        return (
            <div className={classes.quickPay}>
                {lastPays.map(pay => (
                    <Button
                        className={classes.btn}
                        key={`quickPay-btn-${pay.price}`}
                        variant="contained"
                        color="primary"
                    >
                        {`$${pay.price}`}
                    </Button>
                ))}
            </div>
        )
    };

    const title = "Personal Information";

    return (
        <div className={classes.root}>
            <div className={classes.title}>{title}</div>
            <div className={classes.desktopPersonalInfo}>
                <img className={classes.avatar} src={avatar} alt="user avatar"/>
                {persInfoAccordion()}
                <Accordion className={classes.accordion} expanded={expanded === "Quick pay"}
                           onChange={handleChange("Quick pay")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography className={classes.heading}>Quick pay</Typography>
                        <Typography component={'span'} className={classes.secondaryHeading}>{quickPay()}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className={classes.text}>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
})

const useSmallTableStyles = makeStyles((theme) => ({
    smallTable: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100%",
    },

    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,
    }
}))
const SmallTableDevices = observer(() => {
    const classes = useSmallTableStyles();

    const devices = [];
    ports.data.forEach(({cameras}) => {
        cameras.forEach(camera => {
            devices.push({
                id: camera.id,
                "Country": camera.country,
                "City": camera.city,
                "Title": camera.description,
            });
        })
    })

    return (
        <div className={classes.smallTable}>
            <div className={classes.title}>Title</div>
            <AccountTable secretTitle={"Personal information: short Devices"} rowsData={devices}
                          search={"Title"} searchLabel={"Devices Name"}/>
        </div>
    )
})

const useSmallTableFleetStyles = makeStyles((theme) => ({
    smallTable: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100%",
    },

    title: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 24,

    }
}))
const SmallTableFleet = observer(() => {
    const classes = useSmallTableFleetStyles();

    const fleet = account.myFleet.map((vessel) => ({
            id: vessel.id,
            "IMO": vessel.imo,
            "Name": vessel.name,
            "Type": vessel.vesselTypeDetailed,
        })
    )

    return (
        <div className={classes.smallTable}>
            <div className={classes.title}>Title</div>
            <AccountTable secretTitle={"Personal information: short Fleet"} rowsData={fleet}
                          search={"IMO"} searchLabel={"Search IMO"}/>
        </div>
    )
})

const drawerWidth = 250;

const useResponsiveDrawerStyles = makeStyles((theme) => {
    const bgcMain = "#444";
    // const bgcGridItem = "#f00"
    const bgcGridItem = "#f5f5f5"

    const secondColor = "#999";

    const textColor = "#ccc"

    return ({
        root: {
            minHeight: "100vh",
            background: useHexToRgba(bgcMain, 0.7),

            backgroundAttachment: "fixed",
            backgroundPosition: 'center',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            zIndex: 1,
            width: drawerWidth,
            background: useHexToRgba(bgcMain),
        },
        content: {
            flexGrow: 1,
        },
        adjustmentPosition: {
            paddingLeft: drawerWidth,

            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
            },
        },
        list: {
            overflowX: "hidden",
        },
        listItem: {
            "&.isActive": {
                paddingRight: 0,

                "&::after": {
                    content: `"1"`,
                    width: 3,
                    height: "40px",
                    display: "inline-block",

                    color: "transparent",

                    borderTopLeftRadius: 3,
                    borderBottomLeftRadius: 3,

                    // background: hexToRgba(firstColor, 0.8),
                    background: useHexToRgba(textColor, 0.8),
                },
            },
        },

        listItemText: {
            fontFamily: styles.fontFamily,
            fontWeight: 400,
            color: secondColor,

            "&.isActive": {
                fontWeight: 500,

                // color: firstColor,
                color: textColor,
            },
        },

        listItemIcon: {
            color: secondColor,

            "&.isActive": {
                // color: firstColor,
                color: textColor,
            },
        },

        gridContainerMain: {
            margin: 0,
            padding: 0,
            marginLeft: theme.spacing(-1),

        },

        gridContainerItem: {
            margin: 0,
            padding: 0,
            minHeight: "100%",
            marginLeft: theme.spacing(-2),
        },

        gridItem: {
            minHeight: "100%",
            padding: theme.spacing(1),
            borderRadius: 5,
            background: useHexToRgba(bgcGridItem, 1),


            "&.first": {
                [theme.breakpoints.down('md')]: {
                    marginBottom: theme.spacing(-3),
                },
            },
        },
    })
});
export const ResponsiveDrawer = observer((props) => {
    const {window} = props;
    const classes = useResponsiveDrawerStyles();
    const theme = useTheme();
    const {width} = useWindowDimensions();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(account.drawerItems[0].title);
    const [content, setContent] = React.useState(account.drawerItems[0].object);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClick = (text, index) => {
        setSelected(text);
        setContent(account.drawerItems[index].object)
    }

    const drawer = () => {
        return (
            <div>
                <div className={classes.toolbar}/>
                <List className={classes.list}>
                    {account.drawerItems.map((item, index) => {
                        const isActive = selected === item.title ? "isActive" : "";
                        return (
                            <ListItem
                                key={item.title}
                                className={`${classes.listItem} ${isActive}`}
                                button
                                onClick={() => handleClick(item.title, index)}
                            >
                                <ListItemIcon
                                    className={`${classes.listItemIcon} ${isActive}`}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title}
                                              classes={{primary: `${classes.listItemText} ${isActive}`}}/>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider/>
            </div>
        );
    }

    const gridContentItem = (components = []) => {
        return (
            <Grid container spacing={3} className={classes.gridContainerItem}>
                {components.map(({prefix, component}, index) =>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={`gridContentItem--${index}`}>
                        <div className={`${classes.gridItem} ${prefix}`}>
                            {component}
                        </div>
                    </Grid>
                )}
            </Grid>
        )
    }

    const gridContent = () => {
        const left = [
            {prefix: "first", component: width > 600 ? <PersonalInformation/> : <PersonalInfoMobile/>,},
        ]
        const right = [
            {prefix: "", component: <SmallTableDevices/>,},
            {prefix: "", component: <SmallTableFleet/>,},
        ]

        return (
            <div className={classes.adjustmentPosition}>
                <Container maxWidth={"xl"}>
                    <Grid container spacing={3} className={classes.gridContainerMain}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            {/*{gridContentItem([<PersonalInformation/>], "first")}*/}
                            {gridContentItem(left)}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            {/*{gridContentItem([<SmallTableDevices/>, <SmallTableFleet/>])}*/}
                            {gridContentItem(right)}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Header/>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer()}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer()}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {gridContent()}
            </main>
        </div>
    );
})
ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export const Test = observer(() => {
    const classes = useStyles();
    const gridTest = () => {
        return (
            <div className={classes.container}>
                <div className={`${classes.item01} one`}>First</div>
                <div className={`${classes.item01} two`}>Second</div>
                <div className={`${classes.item01} three`}>Third</div>
                <div className={`${classes.item01} four`}>Fourth</div>
                <div className={`${classes.item01} five`}>Fifth</div>
                <div className={`${classes.item01} six`}>Sixth</div>
                <div className={`${classes.item01} seven`}>Seventh</div>

                <div className={`${classes.item02}`}>1</div>
                <div className={`${classes.item02}`}>2</div>
                <div className={`${classes.item02}`}>3</div>

                <div className={`${classes.item03} one`}>1</div>
                <div className={`${classes.item03} two`}>2</div>
                <div className={`${classes.item03} three`}>3</div>
                <div className={`${classes.item03} four`}>4</div>

                <div className={`${classes.item03} five`}>5</div>
                <div className={`${classes.item03} six`}>6</div>
            </div>
        )
    }

    return (
        <div className={classes.test}>
            <ResponsiveDrawer/>
            {/*<PersonalInformation/>*/}
        </div>
    )
})