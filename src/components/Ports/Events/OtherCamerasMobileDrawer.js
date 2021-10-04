import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ports from "../../../store/ports";
import header from "../../../store/header";
import {DrawerSearch} from "../Drawer/DrawerSearch";
import List from "@material-ui/core/List";
import {DrawerItems} from "../Drawer/DrawerItems";
import React from "react";

const useOtherCamerasListStyles = makeStyles(() => ({

}));

export const OtherCamerasMobileDrawer = observer(() => {
	const classes = useOtherCamerasListStyles();

	const {port, camera} = ports.selectedObjects;

	if (!Number.isInteger(camera.id)) {
		ports.setSelectedCamera(ports.data[0].cameras[0].id);
	}

	const search = "description";
	const searchLabel = "Camera Name";
	const secretTitle = `Other-Cameras-List--${Number.isInteger(ports.selectedObjects.port.id)}--camera`;

	const otherCameras = port.cameras?.filter(({id}) => id !== camera.id);
	const notify = header.camerasNoteTest;

	const handleGoToNextCam = (camId) => {
		ports.setSelectedCamera(camId);
	}

	return (
		<div>
			<div className={classes.search}>
				<DrawerSearch data={otherCameras} search={search} label={`Search ${searchLabel}`}
				              secretTitle={secretTitle}/>
			</div>

			<List className={`${classes.main}`} component="nav" aria-label="main mailbox folders">
				{otherCameras?.map(({id, description, zoom}) =>
					<DrawerItems
						key={`${id}-${description}-${zoom}-${description.length*100+id*100}`}
						icon={ports.cameraIcon.drawerIcon}
						description={description}
						notes={notify[id]}
						onClick={() => handleGoToNextCam(id)}
					/>
				)}
			</List>
		</div>
	)
})