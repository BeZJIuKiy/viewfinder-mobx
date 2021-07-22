import {makeAutoObservable} from "mobx";
import {userAvatar} from "./ports";
import Icon from "@mdi/react";

// ICONS
import PersonIcon from '@material-ui/icons/Person';
import VideoCam from '@material-ui/icons/Videocam';
import {mdiFerry} from '@mdi/js';
import PaymentIcon from '@material-ui/icons/Payment';


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
        {id: counter.id++, icon: <PersonIcon/>, title: PERSONAL_INFORMATION},
        {id: counter.id++, icon: <VideoCam/>, title: DEVICES},
        {id: counter.id++, icon: <ShipIcon/>, title: FLEET},
        {id: counter.id++, icon: <PaymentIcon/>, title: PAYMENTS},
    ];

    selectedItem = "";
    selectedItemIndex = null;

    counter = {
        fleetId: 0,
    };

    personalInformation = {
        avatar: userAvatar,
        firstName: "Fernan",
        secondName: "Magellan",
        dateOfBirth: "20.11.1480",
        sex: "male",
        company: "ServiceSoft",
        status: "Gold"
    };

    contactInformation = {
        phone: '+X (XXX) XXX-XX-XX',
        email: 'servise.soft@somemail.com',
    };

    userData = {
        avatar: userAvatar,
        name: '',
        company: '',
        phone: '+X (XXX) XXX-XX-XX',
        email: 'servise.soft@somemail.com',
        status: 'Gold',
    };

    information = {};
    statistic = {};

    myFleet = [];

    constructor() {
        makeAutoObservable(this);
        this.myFleet = this.testFleet();
    }

    testFleet = () => {
        const testFleet = [];
        for (let i = 0; i < 10; ++i) {
            testFleet.push({
                id: this.counter.fleetId++,
                imo: `${i}${i}${i}${i}${i}${i}${i}`,
                name: 'SERVICESOFT',
                vesselTypeGeneric: 'Cargo - XXX',
                vesselTypeDetailed: 'Container Ship',
                status: 'Active',
                mmsi: `${i}${i}${i}${i}${i}${i}${i}`,
                callSign: 'AAAA',
                flag: 'Any country',
                grossTonnage: 'XXXXXX',
                summerDWT: 'XXXXXX', /* В тоннах */
                lengthOverallBreadthExtreme: `${450 + i} x ${62 + i} m`,
                yearBuilt: 2020,
            })
        }
        return testFleet;
    }

    setSelectedItem = (index) => {
        this.selectedItem = this.drawerItems[index].title;
        this.selectedItemIndex = index;
    }
}


export default new account();