import React, {useEffect, useState} from 'react';
import {Clusterer, Map, Placemark, YMaps} from 'react-yandex-maps';
import './yaMap.css';
import ports from "../../../store/ports";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";

const useStyles = makeStyles((theme) => {
	const {width, height} = useWindowDimensions();
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		yamap: {
			width: "100%",

			"&.show": {
				display: "flex",
				minHeight: "100%",

				paddingTop: 92,

				flexGrow: 1,
				// height: `calc(100vh - 64px)`,

				"@media(max-width: 425px)": {
					// height: `calc(${scrollHeight}px - 124px)`,
					// height: scrollHeight,
					// minHeight: "100%",
					minHeight: scrollHeight,
				}
			},

			"&.hide": {
				display: "none",
				height: 0,
			}
		},

		item: {
			// width: "calc(100vw - 300px)",
			width: "100%",
			height: "100%",

			"@media(max-width: 425px)": {
				width: "100%",
			}
		},

		balloon: {
			"&.text": {
				margin: "10px 0 20px 0",
				borderRadius: 5,
				fontSize: 18,
				padding: 10,
			},
			"&.link": {
				textAlign: "end",
			},
			"&.content": {
				marginBottom: 10,
			},
			"&.linkItem": {
				borderRadius: 5,

				color: "inherit",
				textDecoration: "none",

				fontSize: 18,
				padding: 10,

				transition: "background-color 0.2s linear",

				"&:hover": {
					backgroundColor: "#eee",
				}
			},
		},
		balloonText: {},
		balloonLink: {},
	})
})

const YaMap = observer(({isVisible, style}) => {
	const classes = useStyles();

	const {data, portIcon, cameraIcon, selectedObjects} = ports;

	const [allData, setAllData] = useState(data);
	const [balContent, setBalContent] = useState('');
	const [mapCenter, setMapCenter] = useState();

	useEffect(() => {
		const portId = Number.isInteger(selectedObjects.port.id);
		const controls = [
			'zoomControl',
			'fullscreenControl',
			'typeSelector',
			'rulerControl',
		];

		if (portId) {
			setAllData(selectedObjects.port.cameras);
			mapData(selectedObjects.port.coordinates, selectedObjects.port.cameras[0].zoom, controls);
		} else {
			setAllData(data);
			mapData(data[0].cameras[0].coordinates, data[0].zoom, controls);
		}
	}, [selectedObjects.port]);

	const mapData = (center, zoom, controls) => setMapCenter({center, zoom, controls});
	const clickOnCamera = (camera, id) => {
		ports.setSelectedCamera(id);

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

	const portsCoordinates = allData.map((c, i) => {
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
		<div className={`${classes.yamap} ${isVisible ? 'show' : 'hide'}`} style={{...style}}>
			<YMaps query={{lang: "en_US"}}>
				<Map className={`${classes.item}`}
				     state={mapCenter}
				     modules={[
					     'control.ZoomControl',
					     'control.FullscreenControl',
					     'control.TypeSelector',
					     'control.RulerControl',
				     ]}
				>
					<Clusterer
						options={{
							preset: 'islands#invertedYellowClusterIcons',
							groupByCoordinates: false,
						}}
					>
					{portsCoordinates}
					</Clusterer>
				</Map>

			</YMaps>
		</div>
	)
})

export default YaMap;