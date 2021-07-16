import {makeAutoObservable} from "mobx";
import {userAvatar} from "./ports";

class account {
	counter = {
		fleetId: 0,
	};

	userData = {
		avatar: userAvatar,
		name: 'fernan magellan',
		company: 'ServiceSoft',
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
		for(let i = 0; i < 10; ++i) {
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
}


export default new account();