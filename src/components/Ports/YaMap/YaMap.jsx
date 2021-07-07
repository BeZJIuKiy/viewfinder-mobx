import React, {useEffect, useState} from 'react';
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import './yaMap.css';
import ports from "../../../store/ports";
import {observer} from "mobx-react-lite";

const YaMap = observer((props) => {
	const {data, portIcon, cameraIcon, selectedObjects} = ports;
	const [allData, setAllData] = useState(data);
	const [balContent, setBalContent] = useState('');
	const [mapCenter, setMapCenter] = useState();

	const mapData = (center, zoom, controls) => setMapCenter({center, zoom, controls});

	useEffect(() => {
		const portId = Number.isInteger(selectedObjects.port.id);
		const controls = [
			'zoomControl',
			'fullscreenControl',
			'typeSelector',
			'rulerControl',
		];

		if (portId) {
			setAllData(selectedObjects.port.cameras.data);
			mapData(selectedObjects.port.coordinates, selectedObjects.port.cameras.data[0].zoom, controls)
		} else {
			setAllData(data);
			mapData(data[0].cameras.data[0].coordinates, data[0].zoom, controls);
		}
	}, [selectedObjects.port]);

	const clickOnCamera = (camera, i) => {
		ports.setSelectedCamera(i);

		const {name, description, type, coordinates, link} = camera;
		setBalContent(`
		    <div class="yamap__balloon__content">
		        <iframe width="400" height="300"
		            src=${link}?controls=0&autoplay=1&mute=1"
		            frameBorder="0" allow="accelerometer;
		            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
		        </iframe>

		        <div class="yamap__balloon__text">
		            <div>Camera name: ${name}</div>
		            <div>Description: ${description}</div>
		            <div>Model: ${type}</div>
		            <div>Coordinates: ${coordinates[0]} ${coordinates[1]}</div>
		        </div>
		        <div class="yamap__balloon__link">
		            <a class="yamap__balloon__link__item"		                
		                href='/events'}>
		                Move to ${name}
		            </a>
		        </div>
		    </div>
		`);
	}

	const porstCoord = allData.map((c, i) => {
		return (
			<Placemark
				onClick={() => (!c.link) ? ports.setSelectedPort(i) : clickOnCamera(c, i)}
				key={c.description}
				geometry={c.coordinates}
				properties={{
					hintContent: `${c.description} cameras`,
					balloonContent: balContent,
				}}
				options={{
					preset: !c.link ? portIcon.map : cameraIcon.map,
					iconColor: '#ffba00',
				}}
				modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
			/>
		)
	});

	return (
		<div className={`yamap ${props.isVisible ? 'show' : 'hide'}`} style={{...props.style}}>
			<YMaps query={{lang: "en_US"}}>
				<Map className='yamap__item'
				     state={mapCenter}
				     modules={[
					     'control.ZoomControl',
					     'control.FullscreenControl',
					     'control.TypeSelector',
					     'control.RulerControl',
				     ]}
				>
					{porstCoord}
				</Map>

			</YMaps>
		</div>
	)
})

export default YaMap;