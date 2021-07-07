import React, {Component} from 'react';
import {SelectedCameraAction, SelectedPortAction} from "../../store-redux/action-creators/ports";
import {connect} from "react-redux";

class Tests extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
		<div>
			<p>
				<button onClick={() => this.props.SelectedPortAction(0)}>Port</button>
				<button onClick={() => this.props.SelectedCameraAction(1)}>Camera</button>
			</p>
		</div>
		)}
}

const mapStateToProps = (state) => {
	return {ports: state.ports};
}

const mapDispatchToProps = () => {
	return {
		SelectedPortAction,
		SelectedCameraAction,
	}
}

export default connect(mapStateToProps, mapDispatchToProps())(Tests);