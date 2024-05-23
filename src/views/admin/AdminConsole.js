import ModalSelector from "../../components/admin/create-form/ModalSelector";
import SideBar from "../../components/admin/layer/SideBar.js";
import {Grid} from "@mui/material";

const CreateForm = () => {
    // todo endpoint to bd
    const loadedPageInfos = [];
    const quizzesInfos = [{
        id: 658745,
        name: 'fffff',
        pages: [{id: 6494984, pos: 1}, {id: 65687, pos: 2}, {id: 965441, pos: 3}]
    }];



    return (
        <Grid container spacing={0} sx={{height: '100vh', width: '100vw'}}>
            <Grid item xs={12} sm={2} md={2} sx={{bgcolor: 'purple', pt: 4}}>
                <SideBar quizzesInfos={quizzesInfos}/>
            </Grid>
            <Grid item xs={12} sm={10} md={10} sx={{p: '3rem'}}>
                <ModalSelector loadedPageInfos={loadedPageInfos}/>
            </Grid>
        </Grid>
    );
}

export default CreateForm;
