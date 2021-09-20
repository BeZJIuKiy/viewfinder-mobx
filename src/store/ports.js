// Icons
import mIcon_ports from '../components/Ports/Drawer/images/harborIcon02.png';
import mIcon_cameras from '../components/Ports/Drawer/images/camIcon.png';
import previewSPbPort from '../img/preView̆.jpg';
import previewImg2 from '../img/preView̆02.jpg';
import previewImg3 from '../img/preView̆03.jpg';

// Boath
import boat1_01 from '../components/Ports/Events/images/b1-01.jpg'
import boat1_03 from '../components/Ports/Events/images/b1-03.jpg'
import boat1_04 from '../components/Ports/Events/images/b1-04.jpg'
import {makeAutoObservable} from "mobx";
import canvasState from "./canvasState";
import {AutoSave} from "./AutoSave";
import {makePersistable} from "mobx-persist-store";
// import boat1_02 from '../components/Ports/Events/images/b1-02.jpg'
// import boat1_05 from '../components/Ports/Events/images/b1-05.jpg'

export const userAvatar = 'https://diletant.media/upload/medialibrary/75f/75fc56318cbdcf69f479b48892351a73.jpg';

class ports {
	windowSize = {
		width: null,
		height: null,
	};

	counter = {
		portsId: 0,
		camerasId: 2,
		eventsId: 0,
	};

	portIcon = {
		mapIcon: 'islands#blueWaterwayIcon',
		drawerIcon: mIcon_ports,
	};

	cameraIcon = {
		mapIcon: 'islands#blueVideoIcon',
		drawerIcon: mIcon_cameras,
	};

	selectedObjects = {
		port: {},
		camera: {},
		event: {},
		shipImage: {
			index: 0,
			isVisible: false,
			id: -1,
		},
	};

	data = [
		{
			id: this.counter.portsId++,
			country: 'Russia',
			city: 'Saint Petersburg',
			description: 'Saint Petersburg',
			coordinates: [59.977915, 30.240934],
			// zoom: 3.3,
			zoom: 5,
			link: '',

			cameras: [
				// {
				// 	id: this.counter.camerasId++,
				// 	country: 'Russia',
				// 	city: 'Saint Petersburg',
				// 	name: 'Camera 1',
				// 	type: 'Hikvision',
				// 	move: 'STATIC',
				// 	viewingAngle: '130',
				// 	description: 'sdf',
				// 	coordinates: [59.762625, 30.355790],
				// 	zoom: 15,
				// 	link: "http://192.168.250.147:8000/bgr",
				// 	previewLink: previewImg2,
				//
				// 	// link: 'https://rtsp.me/embed/ayAby5ia',
				// 	// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
				// 	// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
				// 	// previewLink: "http://87.244.33.186:8001/bgr",
				// 	// previewLink: previewImg,
				// 	// link: 'http://87.244.33.186:8001/bgr',
				//
				// 	events: [
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Warning',
				// 			typeVessel: "Tugboat",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 1',
				// 			date: '2020-12-21',
				// 			time: '10:20:08',
				// 			timezone: '+0300',
				// 			imageLink: boat1_03,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Regular',
				// 			typeVessel: "Dry Cargo Ship",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 1',
				// 			date: '2020-12-21',
				// 			time: '10:22:31',
				// 			timezone: '+0300',
				// 			imageLink: boat1_01,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Critical',
				// 			typeVessel: "Dry Cargo Ship",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 1',
				// 			date: '2020-12-21',
				// 			time: '10:24:16',
				// 			timezone: '+0300',
				// 			imageLink: boat1_04,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 	],
				// },
				{
					id: this.counter.camerasId++,
					country: 'Russia',
					city: 'Saint Petersburg',
					name: 'Camera 1',
					type: 'Hikvision',
					move: 'PTZ',
					viewingAngle: '130',
					description: 'Bench Camera PTZ',
					coordinates: [59.762625, 30.355790],
					zoom: 15,
					link: "http://192.168.250.147:8000/bgr",
					previewLink: previewImg2,

					// link: 'https://rtsp.me/embed/ayAby5ia',
					// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
					// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
					// previewLink: "http://87.244.33.186:8001/bgr",
					// previewLink: previewImg,
					// link: 'http://87.244.33.186:8001/bgr',

					// events: [
					// 	{
					// 		id: this.counter.eventsId++,
					// 		typeError: 'Warning',
					// 		typeVessel: "Tugboat",
					// 		location: 'Russia',
					// 		city: 'Saint Petersburg',
					// 		camera: 'Camera 1',
					// 		date: '2020-12-21',
					// 		time: '10:20:08',
					// 		timezone: '+0300',
					// 		imageLink: boat1_03,
					// 		newEvent: true,
					// 		description: 'Nothing interesting, keep moving on',
					// 	},
					// 	{
					// 		id: this.counter.eventsId++,
					// 		typeError: 'Regular',
					// 		typeVessel: "Dry Cargo Ship",
					// 		location: 'Russia',
					// 		city: 'Saint Petersburg',
					// 		camera: 'Camera 1',
					// 		date: '2020-12-21',
					// 		time: '10:22:31',
					// 		timezone: '+0300',
					// 		imageLink: boat1_01,
					// 		newEvent: true,
					// 		description: 'Nothing interesting, keep moving on',
					// 	},
					// 	{
					// 		id: this.counter.eventsId++,
					// 		typeError: 'Critical',
					// 		typeVessel: "Dry Cargo Ship",
					// 		location: 'Russia',
					// 		city: 'Saint Petersburg',
					// 		camera: 'Camera 1',
					// 		date: '2020-12-21',
					// 		time: '10:24:16',
					// 		timezone: '+0300',
					// 		imageLink: boat1_04,
					// 		newEvent: true,
					// 		description: 'Nothing interesting, keep moving on',
					// 	},
					// ],

					events: [
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							date: "2021-09-08T12:18:56.956Z",
							imo: null,
							mmsi: null,
							callSign: null,
							typeVessel: "Dry Cargo Ship",
							country: 'Russia',
							imageLink: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABWAJ4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDhLiV8gZPXnmoJbKC9UfaVDBTxuJ4qZoppSP3nBPBwf19KkXTi673uAoA4yMZNedfWwENnb6VpMn2iBVQngsMmrh17RhE8d1qSqvG4bP51AdOdm+WWPaOC3NNNnYxSBdySMT/dzzzRZ3AlPiLwnggaqi7e/ltT7TVfDF5nOvQMnTgsDn8uKglSIYcRxrsIPCCmDU0t90omjA3knzB0qrXATTLPWX1138JT2t0NrqguCMcg5Bzx0J5rx79hvXvEHijVPib4V0Xw8txpnhvV2uNWuYbhCluWfaIyOrEn9K9jtmN1cCRNRs2kZvuRKRj29zzXk/wB8T6BH+1f45+D2h+CYvDb3NkswvtOl8pdXnzu3Sp0YgZ5962px5ovQOp68muWjBhp2iNaNHwSU4f1PSnT3muXZWTTNTjtwr5kQpu3DHQenarM66zLE4cRDykxvMm7kfQcc4q14VSCTSJEn0pru+LYgdXwu7Pfjn/69YPcDO1AxSW5GogScc5HU/h0ra0LVfh7pfhh3jt3uNZuG/du4+SEAckVm3+k6/Yy+VrFmkO7ptJJJxURs4oMAXEIP8IagCvf2tze3QuJ7+R23ZUBjxUdzp8zOo3k4PyjHNXUtrhzue4TbkdD1qW5YCPfuQ44GD6UAZ+kpZQ63D9uuI0fzAQZMAH6/wAvxr4Z8YkXvxT8VXC3ONutSsiRDORu4r7R8UWB1i1kMdybZ1GfN9K+XPif4Y0KPxA93o8CvPI7m8uAdgY5xkisZXUkRKDepwN6ryKzDkkZOVxzWakjxOE8nJz1x+dbOq2txbhnCxmMtwVzkVkJc7nJ3ds/drSOw47A92pAJhyD0BI61WuZ7UxosQdZFHz8dc1avFheMMuCc/jiqUqqx2rn165q0m9Sj9DZpNUgdVkSCMHq245FK7arKjQ20lrIT3eU8e9SEXksZKQTupbGWAHb1qK5jcLg28ke0/MTxU2QGdcQatYO1xezG+dnIjtI5yijqf8AP1qey0y/dzc32lizY4CotxvGOvercdvGSqhyWVujDpU00psHBmVXUuFyBzzQotvQCOaziltjDNd+VxkuGwB7nNJd6HJZwfvIUkdDuz03jHftmuO+KHxx8K+Db+78PeJfCFzdWUMC/bJIywYq/HG0g8E9qwf2dj4k0n4yeIPhTB4k1LW9AbRhq/h66vGDCJGY74WlbkkEngnNaRsB614bginvId+jtFtT/ljyWz9enSvlO717U/A3/BVeax1Twzq+o21zo5TRLW1YeZuKffHXcRyMehNfYfgW08Qi4Oof8I3JbwLIGgku3CLIeex5AzXzj+0T4TvNE/4KC+CviF4m1Ww03SblxJf3qXq+bDxjbGo+8oJ574zW1OtCF0wPomLxWNf8Aad4Fn+GtzoN7ptxNjUbu6XzZkkdW8tgDghSDg9eazo57nS7tNPt9Vu3dm+7ZwFueOCRWj4C/srx5reqeGvHeu6Jpt7Gkl1p92bw7by2PKOgwSXx1XFeg+D/AIkeBvD/AIGbXvCuoiVhaF4oza+VNK6jDEK6lt3A6cVz/FqgOQu7GKTQ3utdvrqG6L/6NEyElh3yT09a526s7K4YxlxnHDMea3PFPj7xl8QYo9S1KS2trFog9pDj95Irc7mwOPpmsBUkiTCEHJOSRzSAYdOiiIEUhXjqG607yfKjwrn3NJdPfEbktpOuAVXI6dartPq8sf7u3PpkgUAZ3inxHp3hawe71KyluULhTHGvOSD+nFfN/wATtA1Ma21y2v201ldy7ktILYCS0XBJ3nGTz719KalpmsvatPf3llDEQQZp4i23IODgAg159qnwbvNe159QfxnoM91OvEUt1JEHUdGCnAU/T1o0A+fbrR1ThJGePB3ZHrisi48JsrtJFbttJJJPT8K981z9k/41KDLpfiHwLexSMWWCHxRD5oHuvOPx5rnNW/Z3+KfhO2/tHxK2lJEQXEdprCTnH0HTr6dqcVd6FJLseLaholzBHuSIZ3Y4HWs27s5om3PkH1Ar0+fwy6l2Z0fBPAHf+tZsugRTEKsa8eqUO8dAcT7Ditls4lht7x9i/dAZv6mp0dhwbskAfxc1Ct/qm7I0k9euM8Y69aQm4Me+W1kUBuAfzpEkonkJ8uCWJ2UEsucNjuah85LqKXXJtVjitLRd9xJK4VUHqSeBir/w9+GPhDxWfEPxA8eeLZ9H0Tw3YGe9aBCXlXklR9fbmqj6/wDBb4o+Cob7wRoM2neD7u281otQnJlugCR5spfJ5PIXpjGaWvQdmeHftafFiwgm0PTPhnaS63qfiINGs9lFvhhjTlpXk5AA9O9dX+zH8Kvif4os3vbPxTYNaW9uzG7F9HG4bGfLAJBbnJx2qja/Gb9kbSL/AFu/bx7JFpXhmz8ubS7TTv3WGQqwDAZGCc8DmvJfF9z+zJ4y8Z6f8VfhFBq9h4WsohKEm1OUQvMQcjaW5yRwOD9MVrKnancLH6K/D7/gm/8AtifHHwj/AGz4b+MGk+EFuIyttf8AiDT5LsqmPvpCrAe4J4NYGq/8G5/7ZHi34k6b8Q/H/wDwVK8My6holpJDp1zN8KbaQRK642iBpwjE5+8c4znjmvm/4u/Fv/gpDr3juHwZ+yT8QfHE/gOfwCt34T1LTp2RdOv1TLQNM2d3KldrZHzjGOtdv+yX40/brj/Zn8P+J/iv4U8Xal4ufx9a6ZrMHijxteW5bTpGxJd7PMG1lznZ37bR0whTqtXUkPlR2/iL4JfsdfsSeLPDHhP9pj/gsReSeI9D1JbRbDQvAcDz2kknybpVt/tX2cZYAPJtT0IIrsfjV8YPGv7Hv7Tl58Hv2P8A/gmj4s+LurafYQanrHxC8ReJIvKurK4VSGgJV15BPBaJgcAp3Pw5+2V4k/aO/ZX/AGvfi34D+Efx78DeGYJr6HVLS41NbQ6jOhjB3Ga5jllZAd5AZjkEEVL8Zf2jPjT4P8MfD7xJr/7aviSPxB438BTyeMbDwTHJeTa6MjyDEEUJCGHyl02cZrWnRnFJt3uLQ+0fiF4G+FvhvS4fEV341bR/EGqwJey+A7877rTZZBueBmUlMKTjg44rjUvYjhocYxkMBXM/Aj4NT+Gv2ePBWt3PhLUn1nWrWTUZl8QEnUrSHJAFwXBIc9cZzXQ6fHFrDOixXFvIDnbPFtIH9etJiJptWuolKh8gvk4FV3v1KHcrIR1z6mrdt4T+03eybWI1HQCUhP6iq2qWdvpZMNxqkUmAdsikEE/hQlcDGvrm9kJ2XwZcY2FMj6c9awvEGiw6mPM1TT7Wd4R+63QKMD6gZxzXTyR2IU+Vdeaf9lcZx/L0qheOhb5ogAuaLO4Hk918HvAUd5NfweFLaGeU5klhyrN36j3qFfBGl6OrNp1gYi/XEhYn8ya9J1LTEkTcpGcE4QnH61jzaVM5yy4XPDDjimrp3Gm0cBN4Wj3F0ypPPTvVW48PXCEguvB4LLzXfXOlNHwiLkjd8wPTFUb/AEl1wSo2noeTQ5xvsVzNnsJu5SPKij6HPQcitXSdHGpxB5ZlRyQCG9KrWllLMpbEoCnLFo8D9awdY+MPw38NeILfwxe+O9OW/uGKx2STBmLY6EDOKiMHNiSPTFht/hp4WufCOtXdnPp2rsLzUTEnmusSjOTwSc4xj3r5g+L/APwUF/YT0/Rr7wHrNk2oRvqCQTaTpu+IQKjBvvIQVUAHPftXc/HHR/iJ4v8ABN1/wrjxBqsN7ehbSIWRwyq5AITIwPXP616/8Pv+Cb//AAT2i8D6dpnxT/ZB0jWNUggU3d9cX9zHPPOyjzDI0Ui7yWyeelVOKpatstK58U/Ef9rf9gTVtFli+G3w/wBG0+y16z26lcX42TkxgEIAc5BIAywzVTWvBXww/a08QeCf2X/2bvA862WoWh1DxxN4UT7VHpNkgyd7twrsevTHpX6DaZ/wT7/4JhwxNY6f+wh4aMU0nz/ab66kPBzwXkyBnHAxXC2Ot/CH9jj4weLvD37KP7FWowpd/YYr+48PXYW3Xc2CCrZbaM5OTQ6/MrK5XIxf2XfHvxC+E0fjP9m3xf4I1/RdI8G3ER8LR6tp/l/2ra7VxsdBumPGSfzNZ/7U3jLU/GmlaP4C8UazfWHh5NdtNdtEtpfKmkuYcOI5pE58o8/L0PGRXkP/AAUD/br/AGpvC3xXufEf7M3grUdR1G1to7fUEutEmvnsmIxiILn5eTnr+FWfhF8d5viD8NtG1n49/DXxrd+KL2zWbVrO18FXRhWT+6AV4xSUJqPMErJWPonxl8I/2Tvjt491D4neOv2WNK8SeIb3TbffqNzpQld4/LAyd5wUVRjkV1ugaDpHgvw9oll8GfDPh3SZhbiztpriyB+x2obIjjbBkKLn7gO0GuG8CftTnTlTy/gx4/2RxCKKSLwrMpKdkwQML2xXSaJ8b/FHi7UIdH8Pfs7+M7e1kRkee60+GFShOCChfdjmsnOfcybTZ6novwL+Cnhy6X4r/FP426j4j1C/vVgikExjT7QuWEMMKZCjjGDuPuOleW/teeLfDCfFaOw8L6KXZrYOluibT5m0ZT5Ry3Tr613Z8S+L/D/hqysfBv7MNxK2jrINPuNQZAtgWHLxopPJJPPBr50+F+k/8FHPF3x6ufEPxD+FHhKx8ORee+mXi3ZM7k52vIrHdnGMnjp3qqb53oJ2IrXxBpngTR5fHnxJ8JTTTPcrbRaa7OxikbJViF+nPQVJ8T/AXibSPEy6b4m0G6tbm8so7m2sdNs3nbY4DDCpuIP1/KvWfBPh3xf8DPhxrHjH4mWth4m8U6hDeal4e0lCX+13IRgiHcBmNTg4XBxnnFflHpP7S37e/wAO/iTrnxt/4X5c6Z4x8Tyyz3ttdRGWC32SfLFArlhGq8qAOMAA56110qU5Mzc0j7ns9Omsi2kvoV7b3SAM6XkEsbhD0JVgMZx6CmS6HKrG9MuyIEoBdZQe/Wvkfx7/AMFD/wBqf9rrxbo3w78TeEJ7XWb3STbJq/hScpc31yF/1mTgIB128qKf8b/hN+3T8S/DPh7VPjN8I/EEHh3wVprHUZdU1iKK51YjO1hHbygE9ORye4r1qOW1a0b2sDmkj6h8T694U8Oaa2r65420O0jjkCOBqkbspIIyUB3DqOelNk0oPpq6nFrlpdQuQFe0mSQYPOflJ56cV8QfBvwXrvxO0u712w+BUVpa3EEttHJdvsZn+75jF/mYoecZ5xXpv7M/7M2s/AzxFJpWi/HWTU/F+oabJMmgT25+xSwL82TI2SjAZ6EZNbVsjqRhdChVjJ2se+TiVY2KneMkhiP6etQSw3N392PgE4UnpXKzftAeFfC3w/vfHnj/AEq9t20+fyp9PjQebM+efLz94da7fw/4k8M/EHwtp3jPwhc4tNQtUmRHI3LkdG9GBBBHUV4WKwdfDazNbaXRw+p+Hf2rNUtv7I1j4paZqEM+N0MOqxguMHPKnjNcJL8BfG/w9vrjxFcfAb+0JmfzLe+tL15HDYPT5s10N18OPt1wL/8AtZ43XlY0OAMdBgYrbtL/AOLGlxhNJ8c3G1PuK0gOOPfNbyt0NnJNnO/DPx5+0/rv7S3gD4b6/qGo6J4abXIP7cub+xykdr87MBkE/wAKjOeM1+hvjn4p+HvD+tX9nYxS31tFfTLbSQ3AG+PcQpCnvgAckn1r4Vfxp8erTbPba7FM6ZwZIVz9CccjirEfxp+NWnyC71jToncNlnj4yfwzXHVhVnrfQamkfXGl/HLxpquovbW3wYvriFn3QSLqaLkAZAO08Amo7/wX418W6nea1p9jFp2oXqKdQtTeAMNvRcqvI718u6b+2X8YNGDWMXhW4giZxvljjbLc54PFaEf7ZfiEPnVP7eV3k+Z0lMPJ7ZXmslTknsPnR9ceGPB/x90nT2WO4soYC25xCitKTjscEj9OtbHxb8b/ALWXgfwd4dv/AICfCNPE+pXerx2utW2q62LRrKyP37hSxG8j+6OfrXyLD+2xrFls8+51RoVIO2fVXPbA5Ug8fWulX/goTqNxpzLofiG4N8FQKJ5JHTAP3iQwJPGME45ofM1boSmvM+wW1PxOJUj1fxPcmUKv75XkKhsAkYI9c/lViCXVNQR1XxLK/DMjSq+FOOxxmvh/UP8AgoZ+0haTTR6P448NWkLABV1fSpnRc9w3mHJ46fWuP8Rftbf8FAPGQMHhT9sT4XW0WRhV8PLFJu9MsMjH1q6OHlOV7pL+vIzvG+lz7o8YaF+1WPEHgmb4Ralo82irrDn4gf2zLMJzZbcKLUcDfu5y3Fdpr17pnhXQdU8WePfFOm6PY2SO5uL69WJFhK87mOCD9Pyr8udZvP8AgqF4vvo7bxb+2zpM+lOwMxsdUNhHg4G3dANyk9c9ODyK8++Iv/BPX9qrxvpb6z4s0r/hNriG+MlpNqfxJmuY7pCQQqrNKRnGQM4969Ck8PTlyyM5JPY+n/2jP+CxHwJ1HT57/wCCfha/8S33hbWbez07UrdGMV7bOwWeKL++oXJ44bBJJr5V/bM0v4Y+Pfjv/wALR+Cfi5p/DdtYw293bS4kY6hdAsI0C4VMH+E+nemp8LP2o/hP4fkvdc/Ys1mw0qKPEbWUkDKyhcD5I2zjg8jrXm+r/H/xVot41y3wa8R6c9zOk0ka+HlKl0ztYrtwSoJ5IzXX9YwtOXu6k8p63+z98AdZ+CPxM0yy+MPxEmjnttP+13mqaZasZNMSUf6hFUbmfJ+90r6E8W/tNeAPCEqxab4V8Q+MIoMeVqXi7WniVsAjL26sq7R6cGvhm1/aq8Y+PfFR07UPi3e+GXu2WOfV9W0sgwrnoSEJOOeMdqo/F3xra2/ip9P0/wCOSeOrdY1C67JbNaiU8ZXayqAVPHBxXsLP8PTpqHJqX7GU46H1j8TP2tvC+sMlz4j17QLaGMkWWkaFamNYh6AAk+2WJPJ5rzHWf2trayti3g/R0hkXP+lTwAsAe2RyR7V4Z4Vs9f8AH3xF0X4e2elKk2s3CW9pdlfNxIxwpGPlI5zjcCQKtfFfTNY+EHxDvvhXrM1uuqadf/Y7tpo2jDckGQDBwM4B5/KuetnsJrlMqWGqxldm14t+Ifijx9dWN54mvPPhNxuChMK2R0HvjNe3f8E4rufXfhDr8b3TSR2njG8jtdz5xGSGFcz8JP2BtQ8baRp3jX4r/FO2bSxOty2haaCJSmG/dlwuVbJXkYOFPPNfQXwt+GngD4NaBJ4a+GXhVNIsppzPLbwyvJ5j4ALszkkkjHftXhYrF+20ep1uMlCxpf8ACNW6wgRRxg7epBPvUb+Eyq8vEc8j5TRRWFNtrUkb/wAI0to/nl04O0Kq8frT2ijmAikQbcdvrRRW3KrICvcm3id0QMGRsA/5NVZ5rJICs8PmHOSXjB/XrRRXNVSU9AOf8Q+F9G1cGe+h3dcYXB/n9K5a7+H+nW2oB9OCRMw5YJ14ooqLgWj8N7zVLeSN9b2qoxgRZwPbNY918JLKOV7ZdXd/LHWS3U0UVrT2CyOQ1vwL4q8JwXOsrqtleQR5L2dzGQrDII6D+lcNZWnibxj45TXdMvpdIubdQ8ZsNZuUjDKwIbyxhc5oopzbbIe56Dpvi79onSrxrvXvj34k1DzHLKtxrtw6p7BSQMe3QVvR/tB/FzTWD3PiYXTqPma5hDkj6nmiipjCLd7DWxW1f9qa90+2aPV/AuiXU0gZXl/smHLZ9yMjnnPWuY1X4y2Wp+H3vrv4R6DLZQzfNGHETk9P4YiD17ntRRXLWlJT0Z2UEuVmRafGX4Kpf2WsD4P3Vhf6ZMLnT7vS9WeJoJFDKGG0rk4Y9fWt/wAP+BvhJ4p8fxSPomq33iXVb8ai+u6zqkkzM5zhXBchgM9cZ6UUVhKpUvuaOMbbHtdz8OfiR4B0tdXt/FNoImYZt4mcBhjHI2gZwcZrsdJvLhdOhlLYdo13kHqcCiitYNuOpyVW7o//2Q==",
							// imageLink: boat1_01,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',
						},
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							date: "2021-09-08T12:18:56.956Z",
							imo: null,
							mmsi: null,
							callSign: null,
							typeVessel: "Dry Cargo Ship",
							country: 'Russia',
							imageLink: "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",
							// imageLink: boat1_03,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',
						},
					],
				},
				{
					id: this.counter.camerasId++,
					country: 'Russia',
					city: 'Saint Petersburg',
					name: 'Camera 2',
					type: 'Hikvision',
					move: 'STATIC',
					viewingAngle: '80',
					description: 'Club Parking STATIC',
					coordinates: [59.977915, 30.240934],
					zoom: 15,
					link: 'http://87.244.33.186:8001/bgr',
					previewLink: previewSPbPort,

					// link: 'https://rtsp.me/embed/hitQb4bf',
					// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
					// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
					// previewLink: "http://87.244.33.186:8001/bgr",
					// previewLink: "http://192.168.250.210:8000/bgr",
					// previewLink: "http://192.168.240.121:8000/bgr",
					// link: 'http://87.244.33.186:8081/bgr',
					// link: 'http://192.168.250.210:8000/bgr',

					events: [
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							date: "2021-09-08T12:18:56.956Z",
							imo: "1".repeat(8),
							mmsi: "2".repeat(8),
							callSign: "Call Signature",
							typeVessel: "Dry Cargo Ship",
							country: 'Russia',
							imageLink: "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",
							// imageLink: boat1_04,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',
						},
						{
							id: this.counter.eventsId++,
							typeError: 'Regular',
							date: "2021-09-08T12:18:56.956Z",
							imo: "3".repeat(8),
							mmsi: "4".repeat(8),
							callSign: "Call Signature",
							typeVessel: "Dry Cargo Ship",
							country: 'Russia',
							imageLink: "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",
							// imageLink: boat1_01,
							newEvent: true,
							description: 'Nothing interesting, keep moving on',

							// id: this.counter.eventsId++,
							// typeError: 'Warning',
							// typeVessel: "Tugboat",
							// location: 'Russia',
							// city: 'Saint Petersburg',
							// camera: 'Camera 1',
							// date: '2020-12-21',
							// time: '10:20:08',
							// timezone: '+0300',
							// imageLink: boat1_03,
							// newEvent: true,
							// description: 'Nothing interesting, keep moving on',
						},
					],
				},

				/* В случае необходимости доп камеры */
				// {
				// 	id: this.counter.camerasId++,
				// 	country: 'Russia',
				// 	city: 'Saint Petersburg',
				// 	name: 'Camera 3',
				// 	type: 'Hikvision',
				// 	move: 'PTZ',
				// 	viewingAngle: '80',
				// 	description: 'Club Parking PTZ 3',
				// 	coordinates: [59.977913, 30.240952],
				// 	zoom: 15,
				// 	link: 'http://192.168.250.210:8000/bgr',
				// 	previewLink: previewImg3,
				//
				// 	// link: 'https://rtsp.me/embed/hitQb4bf',
				// 	// link: "https://www.youtube.com/embed/IJ4hW1VWRAo?autoplay=1&mute=1",
				// 	// link: "http://192.168.250.183:63342/vf-ptz/rtsp/client.html?_ijt=3bma91crvde9ai0smaj26qmv3q",
				// 	// previewLink: "http://87.244.33.186:8001/bgr",
				// 	// previewLink: "http://192.168.250.210:8000/bgr",
				// 	// previewLink: "http://192.168.240.121:8000/bgr",
				// 	// link: 'http://87.244.33.186:8081/bgr',
				// 	// link: 'http://192.168.250.210:8000/bgr',
				//
				// 	events: [
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Regular',
				// 			typeVessel: "Dry Cargo Ship",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 2',
				// 			date: '2020-12-21',
				// 			time: '10:22:31',
				// 			timezone: '+0300',
				// 			imageLink: boat1_04,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 		{
				// 			id: this.counter.eventsId++,
				// 			typeError: 'Warning',
				// 			typeVessel: "Tugboat",
				// 			location: 'Russia',
				// 			city: 'Saint Petersburg',
				// 			camera: 'Camera 1',
				// 			date: '2020-12-21',
				// 			time: '10:20:08',
				// 			timezone: '+0300',
				// 			imageLink: boat1_03,
				// 			newEvent: true,
				// 			description: 'Nothing interesting, keep moving on',
				// 		},
				// 	],
				// },
			],
		},
	];

	searchQuery = {};

	constructor() {
		makeAutoObservable(this, {}, {autoBind: true});

		// makePersistable(this, {
		//     name: "PortsStore",
		//     properties: ["data", "selectedObjects"],
		//     storage: window.localStorage
		// });

		// makePersistable(
		//     this,
		//     {
		//         name: "PortsStore",
		//         properties: ["selectedObjects", "data"],
		//         storage: window.localStorage,  // localForage, window.localStorage, AsyncStorage all have the same interface
		//         expireIn: 86400000, // One day in millsesconds
		//         removeOnExpiration: true,
		//         stringify: false,
		//         debugMode: true,
		//     },
		// );

	};

	setSelectedPort = (portId) => {
		this.selectedObjects.port = this.data.find((port) => port.id === portId);
	};
	setSelectedCamera = (camId) => {
		if (Number.isInteger(this.selectedObjects.port.id) === false) {
			this.selectedObjects.port = this.data[0];
		}

		this.selectedObjects.camera = this.selectedObjects.port.cameras.find((camera) => camera.id === camId);
		canvasState.setPolygonInCamera(this.selectedObjects.camera.id);
	};

	setSelectedEvent = (id) => {
		this.selectedObjects.event = this.selectedObjects.camera.events.find(event => event.id === id);
	};
	clearSelectedEvent = () => {
		this.selectedObjects.event = {};
	};

	// setEvents = (portId, cameraId, events) => {
	setEvents = (events) => {
		this.data[0].cameras[0].events = events;
		// this.data[portId].cameras[cameraId].events = events;
	}

	setIsNewNotif = (id, isNew) => {
		const event = this.selectedObjects.camera.events.find(event => event.id === id);
		event.newEvent = isNew;
	}

	setVisibleSelectedImage = (isVisible) => {
		this.selectedObjects.shipImage.isVisible = isVisible;
	};
	setImageIndex = (index) => {
		this.selectedObjects.shipImage.index = index;
	};
	setImageId = (id) => {
		this.selectedObjects.shipImage.id = id;
	};

	clearSelectedObjects = () => {
		this.selectedObjects = {
			port: {},
			camera: {},
			event: {},
			shipImage: {
				index: 0,
				isVisible: false,
				id: -1,
			},
		};
	};

	setSearchQuery = (secretTitle, data) => {
		this.searchQuery[secretTitle] = [...data];
	}

	clearSearchQuery = () => {
		this.searchQuery = {};
	}
}

export default new ports();