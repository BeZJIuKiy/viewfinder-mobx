import {makeAutoObservable} from "mobx";

class styles {
	fontFamily = `"Quicksand", sans-serif`;

	constructor() {
		makeAutoObservable(this);
	}

	setFontFamily(ff) {
		this.fontFamily = ff;
	}
}

export default new styles();

