import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {observer} from "mobx-react-lite";

export const DRAGGABLE_TESTING = `DRAGGABLE_TESTING`;

export const PaperComponent = observer((props) => {
	return (
		<Draggable handle={`#${DRAGGABLE_TESTING}`} cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
})