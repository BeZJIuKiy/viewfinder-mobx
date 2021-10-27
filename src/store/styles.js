import {makeAutoObservable} from "mobx";

class styles {
	fontFamily = `"Quicksand", sans-serif`;
	headerHeight = 60;
	drawerWidth = 250;

	bgcRegular = "#e0e0e0";
	bgcWarning = "#facc88";
	bgcCritical = "#ee8989";

	bgcRegularHover = "#ccc";
	bgcWarningHover = "#ffb74d";
	bgcCriticalHover = "#c2383c";

	notifyColors = {
		transition: "background-color 0.2s",
		// marginBottom: 1,
		// borderRadius: 2,
		position: "relative",
		// cursor: "pointer",

		"&.regular": {
			// background: this.bgcRegular,
			//
			// "&:hover": {
			// 	background: this.bgcRegularHover,
			// },
		},
		"&.warning": {
			background: this.bgcWarning,

			"&:hover": {
				background: this.bgcWarningHover,
			},
		},
		"&.critical": {
			background: this.bgcCritical,

			"&:hover": {
				background: this.bgcCriticalHover,
				color: "#fff",
			},
		},

		"&:hover": {
			backgroundColor: "#e5e5e5"
		},
	};

	constructor() {
		makeAutoObservable(this);
	}

	setFontFamily = (ff) => {
		this.fontFamily = ff;
	}
	setHeaderHeight = (height) => {
		this.headerHeight = height;
	}
}

export default new styles();

