import {makeAutoObservable} from "mobx";
import {testAccountImg, userAvatar} from "./ports";
import Icon from "@mdi/react";

// ICONS
import PersonIcon from '@material-ui/icons/Person';
import VideoCam from '@material-ui/icons/Videocam';
import {mdiFerry} from '@mdi/js';
import PaymentIcon from '@material-ui/icons/Payment';
import {AutoSave} from "./AutoSave";
import {makePersistable} from "mobx-persist-store";
import {PersonalInformation} from "../components/Ports/Account30/Items/PersonalInformation";
import {Devices} from "../components/Ports/Account30/Items/Devices";
import {Fleet} from "../components/Ports/Account30/Items/Fleet";
import {Payments} from "../components/Ports/Account30/Items/Payments";


export const PERSONAL_INFORMATION = "Personal Information";
export const DEVICES = "Devices";
export const FLEET = "Fleet";
export const PAYMENTS = "Payments";

const counter = {id: 0, pays: 0};

const ShipIcon = () => (
	<Icon path={mdiFerry}
		// title="User Profile"
		  size={1}
		// horizontal
		// vertical
		// rotate={90}
		// color="red"
		// spin
	/>
);

class account {
	/* ПЕРЕНЕСТИ В ОТДЕЛЬНЫЙ STATE */

	payHistory = [
		{id: counter.pays++, date: "11.08.2021", price: 500},
		{id: counter.pays++, date: "11.09.2021", price: 1500},
		{id: counter.pays++, date: "11.10.2021", price: 2500},
		{id: counter.pays++, date: "11.11.2021", price: 1700},
	];

	/* =========================== */
	// page = devicePixelRatio

	drawerItems = [
		{id: counter.id++, icon: <PersonIcon/>, title: PERSONAL_INFORMATION, object: <PersonalInformation/>},
		{id: counter.id++, icon: <VideoCam/>, title: DEVICES, object: <Devices/>},
		{id: counter.id++, icon: <ShipIcon/>, title: FLEET, object: <Fleet/>},
		{id: counter.id++, icon: <PaymentIcon/>, title: PAYMENTS, object: <Payments/>},
	];

	selectedItem = "";
	selectedItemIndex = -1;

	counter = {
		fleetId: 0,
	};

	personalInformation = {
		avatar: userAvatar,
		name: {
			first: "Fernan",
			last: "Magellan",
		},
		// sex: "male",
		company: "ServiceSoft",
		status: "Gold",
		balance: 500,
		// phone: '+X (XXX) XXX-XX-XX',
		phone: '8 800 555-35-35',
		email: 'servise.soft@somemail.com',
	};

	myFleet = [];

	searchQuery = {};

	templateShipData = {
		// id: null,
		name: "",
		imo: "",
		mmsi: "",
		vesselTypeDetailed: "",
		callSign: "",
		flag: "",
		yearBuilt: "",
		images: [],
		status: "Active",
		fromEvent: {
			isFromEvent: false,
			portId: null,
			cameraId: null,
			eventId: null,
		}
	};


	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});
		// this.myFleet = this.testFleet();
		this.myFleet.push({
			...this.templateShipData,
			id: this.counter.fleetId++,
			name: "ServiceSoft",
			imo: "111122224444",
			mmsi: "555566667777",
			vesselTypeDetailed: "Tow Boat",
			callSign: "Test Sign",
			flag: "Test",
			yearBuilt: "2020",
			images: [testAccountImg],
			status: "Active",
		});

		makePersistable(this, {
			name: "AccountStore",
			properties: ["myFleet", "selectedItem", "selectedItemIndex", "templateShipData", ],
			storage: window.localStorage
		});
	}

	testFleet = () => {
		const testFleet = [];

		for (let i = 0; i < 10; ++i) {
			testFleet.push({
				id: this.counter.fleetId++,
				name: 'SERVICESOFT',
				imo: `${i}`.repeat(10),
				mmsi: `${i}`.repeat(i + 1),
				vesselTypeDetailed: 'Container Ship',
				callSign: 'AAAA',
				flag: 'Any country',
				yearBuilt: 2020,
				images: [],
				status: 'Active',
				fromEvent: {
					isFromEvent: false,
					portId: null,
					cameraId: null,
					eventId: null,
				}

				// vesselTypeGeneric: 'Cargo - XXX',
				// grossTonnage: 'XXXXXX',
				// summerDWT: 'XXXXXX', /* В тоннах */
				// lengthOverallBreadthExtreme: `${450 + i} x ${62 + i} m`,
			})
		}
		return testFleet;
	}

	setSelectedItem = (index = 0) => {
		this.selectedItem = this.drawerItems[index].title;
		this.selectedItemIndex = index;
	}

	setSearchQuery = (secretTitle, data) => {
		this.searchQuery[secretTitle] = [...data];
	}
	addShipInMyFleet = (ship) => {
		ship.id = this.counter.fleetId++;
		const shipIndex = this.myFleet.findIndex(({imo}) => imo === ship.imo);
		shipIndex !== -1
			? this.myFleet[shipIndex] = ship
			: this.myFleet.push(ship);
	}
	changeShip = (oldShip, newShip) => {
		const shipIndex = this.myFleet.findIndex(({imo}) => imo === oldShip.imo)
		shipIndex === -1
			? this.myFleet.push(newShip)
			: this.myFleet[shipIndex] = newShip;
	}
	findShip = (imo) => this.myFleet.find((ship) => ship.imo === imo);
	deleteShip = (shipId) => {
		const shipIndex = this.myFleet.findIndex(({id}) => id === shipId);
		if (shipIndex === -1) return;

		this.myFleet.splice(shipIndex, 1);
	}
}


export default new account();