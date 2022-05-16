import React, {useEffect, useState} from 'react';
import {Clusterer, Map, Placemark, YMaps} from 'react-yandex-maps';
import './yaMap.css';
import ports from "../../../store/ports";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {useWindowDimensions} from "../../../useHooks/useWindowDimensions";
import styles from "../../../store/styles";
import eventsState from "../../../store/eventsState";

const useStyles = makeStyles((theme) => {
	const scrollHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	return ({
		yamap: {
			"&.show": {
				display: "flex",
				minHeight: "100%",
			},

			"&.hide": {
				display: "none",
				height: 0,
			}
		},

		item: {
			width: "100%",
			minHeight: "100%",
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
		test: {
			fontSize: 36,
			backgroundColor: "red",
		},
	})
})

const YaMap = observer(({isVisible}) => {
	const classes = useStyles();

	const {data, portIcon, cameraIcon} = ports;
	const {port, camera} = ports.selectedObjects
	const {height} = useWindowDimensions();

	const [allData, setAllData] = useState(data);
	const [balContent, setBalContent] = useState('');
	const [mapCenter, setMapCenter] = useState();

	useEffect(() => {
		const portId = Number.isInteger(port.id);
		const controls = [
			'zoomControl',
			'fullscreenControl',
			'typeSelector',
			'rulerControl',
		];


		if (portId) {
			const [firstCam] = port.cameras;
			setAllData(port.cameras);
			setMapCenter({center: firstCam.coordinates, zoom: firstCam.zoom, controls});
		} else {
			const [x, y] = data[0].cameras[0].coordinates;
			setAllData(data);
			setMapCenter({center: [x, y], zoom: data[0].zoom, controls});

			// setMapCenter({center: data[0].cameras[0].coordinates, zoom: data[0].zoom, controls});
			// setMapCenter({center: [data[0].cameras[0].coordinates, data[0].cameras[0].coordinates[1]], zoom: data[0].zoom, controls});
		}
	}, [port]);

	const clickOnCamera = (id) => {
		ports.setSelectedCamera(id);

		const {name, description, type, coordinates, link} = ports.selectedObjects.camera;

		setBalContent(`
		    <div class="yamap__balloon__content">
		        <!-- <img class="yamap__balloon__content__img" src=${link} alt="123"> -->
		        <img src=${link} alt="123" width="384" height="216">
		        <!-- <iframe width="384" height="216"
		            src=${link}?controls=0&autoplay=1&mute=1"
		            frameBorder="0" allow="accelerometer;
		            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
		        </iframe> -->

		        <div class="yamap__balloon__text">
		            <div>Name: ${name}</div>
		            <div>Description: ${description}</div>
		            <!--<div>Model: ${type}</div>-->
		            <div>Position: ${coordinates[0]} ${coordinates[1]}</div>
		        </div>
<!--		        <div class="yamap__balloon__link">-->
		            <a class="yamap__balloon__link__item"
		                href='/events'}>
		                Details
		            </a>
<!--		        </div>-->
		    </div>
		`);
	}

	const mapPlaceMark = allData.map(({id, coordinates, description, link}, i) => {
		return (
			<Placemark
				key={`HandlePlaceMark-${id}-${description}-${i}`}
				geometry={coordinates}
				properties={{
					hintContent: `${description} cameras`,
					balloonContent: balContent,
				}}
				options={{
					preset: !link ? portIcon.mapIcon : cameraIcon.mapIcon,
					iconColor: '#ffba00',
				}}
				modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
				onClick={() => !link ? ports.setSelectedPort(id) : clickOnCamera(id)}
			/>
		)
	});

	return (
		<div className={`${classes.yamap} ${isVisible ? 'show' : 'hide'}`} style={{height: `calc(${height}px - ${styles.headerHeight}px)`}}>
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
						{mapPlaceMark}
					</Clusterer>
				</Map>

			</YMaps>
		</div>
	)
})

export default YaMap;