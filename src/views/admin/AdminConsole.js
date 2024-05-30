import QuizAdministration from "../../components/admin/create-form/QuizAdministration";
import SideBar from "../../components/admin/layer/SideBar.js";
import {Button, Grid} from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import {useState} from "react";

const AdminConsole = () => {
    const [view, setView] = useState({quiz: true, stats: false, admin: false});

    // todo endpoint to bd
    const loadedPageInfos = [];

    return (
        <Grid container>
            <Grid item xs={12} sx={{pt: 2, pb: 2}}>
                <Button startIcon={<ListIcon/>} variant='contained' sx={{borderRadius: '8px'}}
                        onClick={() => setView({quiz: true, stats: false, admin: false})}>
                    Gestion questionnaires
                </Button>
                <Button startIcon={<BarChartIcon/>} variant='contained' sx={{borderRadius: '8px', ml: 1}}
                        onClick={() => setView({quiz: false, stats: true, admin: false})}>
                    Statistiques
                </Button>
                <Button startIcon={<PersonIcon/>} variant='contained' sx={{borderRadius: '8px', ml: 1}}
                        onClick={() => setView({quiz: false, stats: false, admin: true})}>
                    Gestion admin
                </Button>
            </Grid>
            <Grid item container spacing={0} sx={{height: '100vh', width: '100vw'}}>
                <Grid item xs={12} sm={3} md={3} sx={{bgcolor: 'purple', pt: 1, borderRadius: '15px'}}>
                    <SideBar/>
                </Grid>
                <Grid item xs={12} sm={9} md={9} sx={{p: '3rem'}}>
                    {view.quiz &&
                        <QuizAdministration/>
                    }
                    {view.stats}
                    {view.admin}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AdminConsole;
