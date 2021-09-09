import {makeAutoObservable} from "mobx";

class test {
	isMouseDown = false;

	command = "";

	constructor() {
		makeAutoObservable(this);
	}

	setMouseDown = (isClick) => {
		this.isMouseDown = isClick;
	}

	setCommand = (command) => {
		this.command = command;
	}
}
export default new test();