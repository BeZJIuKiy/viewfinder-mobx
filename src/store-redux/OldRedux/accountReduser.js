import { userAvatar } from "./portsReduser";

let counter = {
    fleetId: 0,
}

let initialState = {
    userData: {
        avatar: userAvatar,
        name: 'fernan magellan',
        company: 'ServiceSoft',
        phone: '+X (XXX) XXX-XX-XX',
        email: 'servise.soft@somemail.com',
        status: 'Gold',
    },

    information: {},
    statistic: {},

    myFleet: [
        {
            id: counter.fleetId++,
            imo: '1111111',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '111111111',
            callSign: 'AAAA',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '450 x 62 m',
            yearBuilt: 2020,
        },
        {
            id: counter.fleetId++,
            imo: '2222222',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '222222222',
            callSign: 'BBBB',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '350 x 52 m',
            yearBuilt: 2019,
        },
        {
            id: counter.fleetId++,
            imo: '3333333',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '3333333',
            callSign: 'CCCC',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '400 x 62 m',
            yearBuilt: 2018,
        },
        {
            id: counter.fleetId++,
            imo: '4444444',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '444444444',
            callSign: 'DDDD',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '250 x 48 m',
            yearBuilt: 2021,
        },
        {
            id: counter.fleetId++,
            imo: '5555555',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '555555555',
            callSign: 'EEEE',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '482 x 64 m',
            yearBuilt: 2006,
        },
        {
            id: counter.fleetId++,
            imo: '6666666',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '666666666',
            callSign: 'FFFF',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '510 x 54 m',
            yearBuilt: 2010,
        },
        {
            id: counter.fleetId++,
            imo: '7777777',
            name: 'SERVICESOFT',
            vesselTypeGeneric: 'Cargo - XXX',
            vesselTypeDetailed: 'Container Ship',
            status: 'Active',
            mmsi: '777777777',
            callSign: 'GGGG',
            flag: 'Any country',
            grossTonnage: 'XXXXXX',
            summerDWT: 'XXXXXX', /* В тоннах */
            lengthOverallBreadthExtreme: '400 x 62 m',
            yearBuilt: 2016,
        },
    ],
}

export const accountReduser = (state = initialState, action) => {
    return state;
}