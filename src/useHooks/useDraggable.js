import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {observer} from "mobx-react-lite";

export const PaperComponent = observer((props) => {
	console.log(props.id);
	return (
		<Draggable handle={`#${props.id}`} cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
})