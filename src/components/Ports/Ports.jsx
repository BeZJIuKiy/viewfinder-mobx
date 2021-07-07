import React, {useState} from 'react';
import {Header} from './Header/Header';
import {Drawer} from './Drawer/Drawer';
import YaMap from './YaMap/YaMap';
import './ports.css';
import {NewMap} from './NewMap/NewMap';


export const Ports = () => {
    const [mapVisible, setmapVisible] = useState(true);
    const addtype = ["Yamap", "NewMap"];

    const handlerMapChange = () => setmapVisible(!mapVisible);

    return (
        <div>
            <Header />
            <div className="searcher">
                <Drawer />
                <YaMap isVisible={mapVisible} />
                <NewMap isVisible={!mapVisible} />
            </div>

            <div className='home__map__changer'>
                <select
                    onChange={handlerMapChange}
                    className="browser-default custom-select" >{
                        addtype.map((address, key) => <option value={key} key={key}>{address}</option>)
                    }
                </select >
            </div>
        </div>
    )
}