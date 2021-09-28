import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import backgroundImage from "../Auth/images/backgroundNew.jpg"
import {observer} from "mobx-react-lite";
import Grid from "@material-ui/core/Grid";
import {Header} from "./Header/Header";
import {Hidden} from "@material-ui/core";
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

const useAccountDrawerStyles = makeStyles((theme) => ({
	accountDrawer: {
		// height: "100%",
		minHeight: "100%",
		borderRight: "1px solid #333",

		position: "fixed",
		// top: styles.headerHeight,
		top: "50%",
		left: 0,
		zIndex: 2,

		transform: "translate(0, -50%)"
	}
}))
const AccountDrawer = observer(() => {
	const classes = useAccountDrawerStyles();

	return (
		<div className={classes.accountDrawer}>
			<div>Item 01</div>
			<div>Item 02</div>
			<div>Item 03</div>
			<div>Item 04</div>
		</div>
	)
})

const AccountContent = observer(() => {
	return (
		<div>
			AccountContent
		</div>
	)
})

const useAccountStyles = makeStyles((theme) => ({
	account: {
		minHeight: "100%",
	},

	gridItem: {
		paddingTop: styles.headerHeight,
	},
}))
const Account = observer(() => {
	const classes = useAccountStyles();

	return (
		<div className={classes.account}>
			<Header/>
			<Grid container className={classes.gridContainer}>
				<Hidden xsDown>
					<Grid item xs={12} sm={3} md={4} lg={3} xl={2}>
						<div className={classes.gridItem}><AccountDrawer/></div>
					</Grid>
				</Hidden>
				<Grid item xs={12} sm={9} md={8} lg={9} xl={10}>
					<div className={classes.gridItem}>Content Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Accusamus accusantium aliquam aspernatur deleniti dicta dolorum eaque eius, eos esse fugit
						inventore iste iure labore laboriosam minima mollitia necessitatibus odit placeat quasi qui quia
						quibusdam ratione rerum sed sunt tempore tenetur veniam. Consectetur debitis repellat sapiente.
						Aliquam beatae delectus ducimus est et ex facere iste odio odit, omnis saepe suscipit temporibus
						ullam? Ad aperiam assumenda aut, blanditiis consectetur deleniti eius est harum nulla quos sequi
						ullam, unde! Ab eaque natus, recusandae saepe sed sint totam. A alias amet consequatur cum
						delectus deleniti deserunt dolor ducimus earum enim expedita facere fugiat, hic ipsam ipsum iure
						magnam magni nam necessitatibus nesciunt nostrum officia officiis placeat praesentium quae
						quidem quisquam quo ratione recusandae saepe sed, sint unde velit voluptas voluptate, voluptatem
						voluptates! Aperiam culpa dolor ipsam praesentium. A aperiam corporis dicta eaque earum
						explicabo, facere, hic illum impedit labore nemo nobis non numquam odio odit placeat possimus
						quae qui reiciendis rerum saepe similique tempora tempore, totam ullam? Adipisci assumenda
						dignissimos dolores ducimus eveniet facere molestiae nobis possimus! Consequatur nobis non
						nostrum officiis quam tempore tenetur unde voluptatem. Distinctio dolor dolorum, eligendi
						eveniet fugiat harum ipsa, laboriosam neque officiis pariatur quae quidem ratione recusandae
						sequi soluta! Ab aliquam aliquid amet aspernatur autem deserunt doloremque ea earum esse ex
						inventore laborum, laudantium modi nam nihil numquam odit optio perspiciatis quasi quisquam
						repellendus tenetur vitae voluptates? Animi fugit harum in libero nemo omnis perspiciatis
						praesentium, quas sapiente sit tempora veniam? Accusantium esse ex facilis fugit impedit, nobis
						obcaecati quidem soluta? A autem cumque debitis, dolorum eaque hic, illo incidunt iusto minima
						modi, necessitatibus nobis numquam quibusdam reiciendis soluta tempore veritatis. Ab accusamus
						ad, cupiditate, dignissimos dolore eius enim et excepturi fugit, iure laboriosam nesciunt quis
						quos ratione reiciendis sed soluta tempora ut veniam voluptatem. Atque autem culpa debitis eius
						eligendi, esse explicabo ipsam iste maiores necessitatibus nemo non, perspiciatis quasi ratione
						repudiandae? Aliquam aperiam, cumque doloribus ducimus eligendi enim expedita itaque maiores
						molestiae mollitia nihil nisi pariatur porro possimus quam qui quos ratione temporibus tenetur
						veniam veritatis vitae voluptate. A ab, aperiam atque autem doloribus iste laboriosam molestias
						nihil, odio officia pariatur perferendis possimus ratione recusandae sunt, ut veniam vero!
						Corporis impedit laudantium quae tempora ut. Culpa quisquam, reiciendis. Assumenda cum debitis
						doloremque ducimus eligendi ex facere impedit magnam, maxime mollitia nemo odio praesentium qui
						sequi soluta? Alias ipsa possimus quis tempore voluptates. Adipisci eos totam ut voluptate.
						Aliquam, deleniti eius enim fugiat in maiores maxime molestias non optio? Ducimus facere maiores
						officiis quod velit! Culpa dignissimos incidunt nesciunt praesentium recusandae rem sapiente!
						Aliquid corporis, culpa dolorem ducimus illum, ipsam, iste iusto molestiae nisi odio optio
						placeat porro quia tempora vel! Ab blanditiis commodi consequuntur culpa deserunt doloremque in
						quidem voluptatem? Earum eligendi fugiat maiores necessitatibus nulla, perspiciatis ratione
						repellendus. Ab adipisci assumenda, beatae consequuntur cumque delectus dignissimos distinctio
						dolorem dolorum ea enim eos est expedita facere ipsam labore laudantium magni mollitia nobis
						officia quidem quos rem repellat sapiente sint suscipit voluptates. Delectus dolorem doloribus
						iusto molestiae vel. Alias aliquam aliquid blanditiis commodi consequatur corporis culpa
						deserunt dicta dolorem doloribus eum explicabo fugit, harum id, maxime mollitia nam nesciunt
						obcaecati odio perspiciatis quam quas quidem quisquam quod recusandae sapiente soluta ut
						voluptas voluptates voluptatum? Deleniti, ducimus, voluptatum? Assumenda atque aut consequatur
						dolores, ipsam labore laboriosam, libero molestiae molestias sed soluta, sunt voluptatibus. Ad
						asperiores atque consectetur cupiditate, ea enim exercitationem expedita fugiat illum laborum
						magnam maxime minima natus nesciunt nisi nostrum odit, officiis omnis perferendis, possimus
						praesentium quasi quidem recusandae rem repudiandae saepe sequi similique sint temporibus unde
						vel velit voluptatem voluptatum. A aliquid at beatae, distinctio, ex facilis fuga fugit in
						inventore iste molestiae necessitatibus nesciunt nisi porro quae saepe soluta tempore totam,
						velit voluptatem. Ad alias consectetur culpa, cum dolorem doloribus earum est expedita harum
						iste, laboriosam laudantium, minima natus nihil non placeat provident quia quibusdam quisquam
						quod repellendus repudiandae rerum vel veritatis voluptatem. Ad aliquam animi aperiam assumenda
						autem cum delectus dolore dolorem eligendi eos et ex exercitationem fugit id iusto laborum
						maiores maxime, modi mollitia nam nemo non nostrum nulla numquam obcaecati officiis perspiciatis
						porro quae qui quo reprehenderit sed sit temporibus velit veniam voluptates voluptatum?
						Accusamus at corporis dolor eos expedita illum impedit in ipsam iure molestias nemo officia
						praesentium quaerat quidem repellendus, sunt ullam velit voluptas voluptate voluptatibus.
						Aspernatur cum dolore ea eligendi eos excepturi exercitationem inventore labore nam natus neque
						nostrum, quasi qui quis quos repellendus sint sit voluptates! Ad amet asperiores aspernatur
						assumenda at aut autem blanditiis commodi consequuntur cum cumque dolores, ducimus eligendi eos
						error et harum hic impedit in ipsum iste iure neque nisi non nulla odit quam qui rem repellat
						repellendus reprehenderit sapiente sed veniam vero vitae voluptas voluptatibus? A ab accusantium
						adipisci alias atque blanditiis corporis cum cumque dignissimos ducimus ea eaque enim error
						eveniet excepturi magni, maxime mollitia nisi numquam obcaecati odio quam quia quis ratione
						soluta suscipit voluptas voluptatibus. Commodi dolorum et nam sit? Ab, aliquam consequuntur
						dolores expedita id in inventore ipsa laboriosam modi molestias mollitia neque nesciunt nulla
						odio odit officia officiis perspiciatis quos rem repudiandae similique suscipit, vel voluptates!
						Accusantium adipisci consequatur consequuntur dicta dignissimos eius enim ex id, incidunt iure
						laborum neque odit rem repellendus saepe sequi tempora totam! Blanditiis corporis laudantium
						magni voluptates! Ab architecto at autem beatae commodi culpa, cumque distinctio ea enim est
						expedita explicabo fuga illo iure labore laudantium maiores maxime necessitatibus nemo placeat
						quod quos reiciendis vel. A adipisci alias animi consectetur culpa cumque debitis deleniti
						dolores eaque eligendi error eum exercitationem illo incidunt ipsa iste laborum maiores modi
						nisi nobis obcaecati optio perferendis perspiciatis placeat provident quo quos, ratione repellat
						repellendus reprehenderit sunt tempora tenetur voluptatem! A accusamus cum cupiditate deserunt
						ducimus fugiat magni sed sint voluptatum. Assumenda at ex in modi, optio reiciendis veniam.
						Provident, repellendus soluta. Dolore dolorem, in magnam natus necessitatibus pariatur quod
						sequi tempora voluptates. Alias aliquam atque aut commodi cupiditate doloremque earum eveniet ex
						exercitationem fugit illum incidunt ipsa iusto laudantium minus nesciunt pariatur perferendis,
						placeat similique tempora. Ab aspernatur, at delectus deleniti impedit laudantium neque
						obcaecati pariatur quaerat quas saepe, unde voluptas voluptates? Asperiores aut beatae cumque
						dolor, ducimus ea eos illum ipsa necessitatibus neque, numquam quia quos rem repellendus
						sapiente ullam vel veritatis? Ab ad, aliquam atque autem consectetur consequatur consequuntur
						cum cupiditate eius enim, ex expedita fugiat impedit inventore ipsam laboriosam maiores
						molestiae molestias numquam odit officia officiis pariatur porro qui repellendus reprehenderit
						sapiente sunt suscipit ullam voluptatem! A alias aliquam aliquid assumenda aut blanditiis
						commodi corporis cum deserunt distinctio dolore eaque, eos error eveniet ex explicabo facilis
						illum ipsam iure minus molestias necessitatibus neque officia quaerat quia, quis rem repellendus
						repudiandae rerum saepe similique tempore temporibus unde velit vitae voluptas voluptatem! Dolor
						ea facilis, fugiat laborum necessitatibus odit velit? Dolorem iusto labore maiores, qui quo
						sint! Accusantium aspernatur distinctio dolorem, esse fugiat laborum magni natus neque quam
						recusandae reiciendis tenetur veritatis. Ab, beatae cum deleniti dolorem exercitationem labore
						magnam quod sunt tempora totam! Amet atque consectetur consequatur cupiditate debitis distinctio
						doloremque doloribus dolorum ducimus excepturi expedita fugit harum hic, laboriosam laudantium,
						maxime molestias nam nemo nesciunt placeat quam quas quisquam quo quos reiciendis repellendus
						reprehenderit repudiandae unde voluptate voluptatem! Deserunt illum maxime repellat? Adipisci
						animi aperiam at cum dolores esse eum excepturi, facere, fuga fugit id illo impedit in ipsam
						itaque iusto laudantium magni molestias nam numquam porro, possimus quas qui quia saepe sapiente
						sed suscipit temporibus totam vero? Ab ad deserunt dignissimos distinctio eaque error est
						excepturi expedita facere harum id illo inventore laudantium maiores modi mollitia nemo nihil
						nostrum numquam officiis placeat porro possimus, quam quas quis suscipit ullam unde. Cumque
						dolor magni modi nemo sapiente! Architecto blanditiis distinctio ea incidunt ipsa ipsam, iusto
						perspiciatis repellat. Adipisci consequuntur delectus deserunt dolor, eos harum impedit magnam
						maxime nulla quae quaerat quasi quia quibusdam quos voluptas? Alias architecto assumenda,
						consequuntur cupiditate delectus deserunt distinctio eaque est eveniet expedita facilis hic
						illum impedit iure minus molestias possimus quod soluta totam vero! A amet aut, blanditiis
						commodi debitis deserunt dolores esse est exercitationem facilis fugiat, harum hic incidunt iste
						iure magnam nemo nesciunt nihil non, odio omnis perferendis quam qui quis repudiandae sed sequi
						vero? A aut blanditiis delectus deserunt dicta dolore doloribus enim esse et expedita explicabo
						fugit illo illum incidunt inventore ipsa ipsum iure laboriosam laudantium libero natus nesciunt
						nobis non nostrum obcaecati odio pariatur placeat porro, quidem quos rerum similique soluta sunt
						tempora temporibus totam ullam! A adipisci consequatur, dolore eius eveniet molestiae
						perspiciatis placeat quaerat, quam quis quod sapiente, tempora vero! Architecto eum fugiat
						impedit minima neque nulla quam repellat tenetur vero voluptas! Autem deleniti in incidunt iure
						placeat quaerat quod saepe voluptatem. Ab delectus fuga in nesciunt numquam reiciendis ullam
						voluptate! Beatae consectetur debitis doloremque eius esse, explicabo fuga fugiat harum id illo
						necessitatibus nihil, odio officia quibusdam quod repellendus sed? Accusamus, adipisci aliquid
						beatae commodi consequatur corporis cum debitis distinctio dolore dolorum eveniet ex facere,
						fugit id maxime minima minus molestias nihil nobis odit omnis possimus quas repellat, saepe sed
						similique sit ut veniam voluptatem voluptates. Autem expedita maxime molestias nihil? Ab ad
						aliquid asperiores culpa ea esse est exercitationem illum impedit molestias nemo nihil nobis
						nostrum nulla odit placeat quae, quisquam sed sunt suscipit unde ut voluptate voluptatibus. A ad
						adipisci alias consequatur corporis deleniti dolor dolores est ex, harum illum impedit laborum
						laudantium magnam mollitia neque omnis optio perspiciatis praesentium qui quia quis
						reprehenderit repudiandae similique ut veniam, voluptas. Dolores et expedita libero mollitia
						natus nobis officiis porro quos, repellendus sint! Fugiat illum incidunt labore maxime numquam
						quaerat, quam saepe. Assumenda delectus deleniti distinctio iste molestias nihil placeat quis
						vitae. Ab aliquam aliquid animi blanditiis consequuntur culpa dicta distinctio dolore dolores ea
						eius eveniet excepturi hic id illum impedit nemo nostrum officia placeat porro praesentium, quia
						reiciendis, repellat sed totam ullam voluptatum! A accusamus ad atque aut exercitationem, fugit
						incidunt inventore ipsa ipsum modi natus nobis odio optio, quia quod suscipit tempora velit,
						voluptate? Excepturi, labore magnam minus molestiae mollitia odit quasi recusandae reiciendis
						sapiente! Cupiditate deserunt et ex ipsum quia recusandae, tempore! Aspernatur cum, delectus, et
						eveniet harum id inventore iure laborum molestiae non, odit sed tenetur vero? Alias consequuntur
						eius harum id impedit inventore libero, necessitatibus officia optio quasi rem, sit? Ab beatae
						corporis cumque id, illo ipsum iusto magni, maiores mollitia nam optio quis, repudiandae vero.
						Ad aperiam aut commodi culpa cum debitis delectus deserunt dolor dolore dolorem doloremque ea
						enim hic illum ipsa ipsam, libero minus nam necessitatibus nesciunt non obcaecati optio
						praesentium quae quia sequi sint totam ullam ut velit vero voluptas voluptate voluptatibus!
						Adipisci animi numquam quaerat recusandae veritatis voluptatem? Animi assumenda deleniti dolor
						dolore, doloremque et exercitationem fuga nisi perferendis porro quibusdam sequi sunt. At autem
						deserunt error eveniet fuga illum impedit inventore modi quia saepe. Ad aliquid assumenda,
						debitis deserunt eaque, eos eveniet facere ipsa laudantium libero molestiae natus, neque
						nesciunt nihil odio quam saepe sint totam. Adipisci amet beatae consectetur distinctio, dolorum
						ducimus ea, exercitationem fugit harum hic id laborum modi mollitia natus obcaecati placeat
						quaerat quasi quibusdam rem repellat, rerum sint vel voluptatibus. Accusantium aliquam assumenda
						atque autem commodi consequuntur cumque cupiditate distinctio error et facere fuga harum ipsa
						iusto nihil quae quibusdam quos ratione veniam, vitae voluptas voluptatem voluptates voluptatum!
						Autem dolorem earum enim exercitationem ipsa maiores maxime, nisi obcaecati praesentium sed! A
						ad amet deserunt dignissimos distinctio dolore, ea eum explicabo in ipsum maxime ratione sed
						tenetur? Accusamus aliquid assumenda atque cum dolorem harum itaque modi natus obcaecati omnis,
						placeat quam sint unde. Adipisci earum qui quo quos repellat. Alias at corporis, earum eos hic
						laboriosam molestias, natus, odit perspiciatis quasi sapiente similique. Beatae doloremque
						excepturi veniam! Aliquam dolore earum eius et eum ex fuga, fugiat fugit hic impedit laboriosam
						nam officia, quas quasi quia quisquam rem repellendus reprehenderit sit voluptatem? Fugit hic
						iste sed voluptatum? Aliquam at beatae consectetur consequatur, corporis dicta distinctio ea
						eligendi et fugit hic inventore magnam magni nam necessitatibus nemo neque non odio officiis qui
						sequi sit totam veritatis. Earum, quam?
					</div>
				</Grid>
			</Grid>
		</div>
	)
})


const drawerWidth = 250;
const hexToRgba = (hex, a = 1) => {
	const newHex = (hex[0] === "#") ? hex.replace("#", "") : hex;
	const rgb = [];

	if (newHex.length < 6) {
		for (let i = 0; i < newHex.length; ++i) {
			rgb.push(parseInt((newHex[i] + newHex[i]), 16));
		}
	} else {
		for (let i = 0; i < newHex.length; i += 2) {
			rgb.push(parseInt(newHex[i] + newHex[i + 1], 16));
		}
	}
	const [r, g, b] = rgb;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const useResponsiveDrawerStyles = makeStyles((theme) => {
	const firstColor = "#444";
	const secondColor = "#999";

	return ({
		root: {
			display: 'flex',
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
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
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

					background: hexToRgba(firstColor, 0.8),
				},
			},
		},

		listItemText: {
			fontFamily: styles.fontFamily,
			fontWeight: 400,
			color: secondColor,

			"&.isActive": {
				fontWeight: 500,
				color: firstColor,
			},
		},

		listItemIcon: {
			color: secondColor,

			"&.isActive": {
				color: firstColor,
			},
		}
	})
});
export const ResponsiveDrawer = (props) => {
	const {window} = props;
	const classes = useResponsiveDrawerStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [selected, setSelected] = React.useState(account.drawerItems[0].title);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleClick = (text) => {
		setSelected(text);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar}/>
			<List>
				{account.drawerItems.map((item, index) => {
					const isActive = selected === item.title ? "isActive" : "";
					return (
						<ListItem
							key={item.title}
							className={`${classes.listItem} ${isActive}`}
							button

							onClick={() => handleClick(item.title)}
						>
							<ListItemIcon className={`${classes.listItemIcon} ${isActive}`}>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title}
							              classes={{primary: `${classes.listItemText} ${isActive}`}}/>
						</ListItem>
					)
				})}
			</List>
			<Divider/>
		</div>
	);

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
						{drawer}
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
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar}/>
				<Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
					facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
					gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
					donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
					adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
					Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
					imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
					arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
					donec massa sapien faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
					facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
					tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
					consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
					vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
					hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
					tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
					nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
					accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography>
			</main>
		</div>
	);
}
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
		</div>
	)
})