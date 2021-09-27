import {makeAutoObservable} from "mobx";

class styles {
	fontFamily = `"Quicksand", sans-serif`;
	headerHeight = 60;

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

