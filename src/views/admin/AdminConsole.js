import ModalSelector from "../../components/admin/create-form/ModalSelector";
import SideBar from "../../components/admin/layer/SideBar.js";
import {Button, Grid} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import {useState} from "react";

const AdminConsole = () => {
    // todo endpoint to bd
    const loadedPageInfos = [];
    const [currentSelection, setCurrentSelection] = useState({});


    return (
        <Grid container>
            <Grid item xs={12} sx={{pt: 2, pb: 2}}>
                <Button startIcon={<ListIcon/>} variant='contained' sx={{borderRadius: '8px'}}>
                    Gestion questionnaires
                </Button>
                <Button startIcon={<BarChartIcon/>} variant='contained' sx={{borderRadius: '8px', ml: 1}}>
                    Statistiques
                </Button>
                <Button startIcon={<PersonIcon/>} variant='contained' sx={{borderRadius: '8px', ml: 1}}>
                    Gestion admin
                </Button>
            </Grid>
            <Grid item container spacing={0} sx={{height: '100vh', width: '100vw'}}>
                <Grid item xs={12} sm={3} md={3} sx={{bgcolor: 'purple', pt: 1, borderRadius: '15px'}}>
                    <SideBar setCurrentSelection={setCurrentSelection} currentSelection={currentSelection}/>
                </Grid>
                <Grid item xs={12} sm={9} md={9} sx={{p: '3rem'}}>
                    <ModalSelector loadedPageInfos={loadedPageInfos}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AdminConsole;
