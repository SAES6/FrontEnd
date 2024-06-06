import QuizAdministration from '../../components/admin/create-form/QuizAdministration';
import SideBar from '../../components/admin/layer/SideBar.js';
import { Button, Container, Grid, Stack, useMediaQuery } from '@mui/material';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminGestion from '../admin-gestion/AdminGestion.js';
import Synthese from '../../components/admin/stats/Synthese.jsx';

const AdminConsole = () => {
  const [view, setView] = useState({ quiz: true, stats: false, admin: false });
  const screenSize = useMediaQuery('(min-width:1600px)');

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  return (
    <Stack
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Stack
        pt={3}
        sx={{
          maxWidth: screenSize ? '1500px' : '1300px',
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
        spacing={3}
      >
        <Stack spacing={1} direction={'row'}>
          <Button
            onClick={() =>
              handleViewChange({ quiz: true, stats: false, admin: false })
            }
            variant='contained'
            color='secondary'
            startIcon={<FontAwesomeIcon icon='fa-fw fa-solid fa-list' />}
            sx={{ opacity: view.quiz ? '100%' : '75%' }}
          >
            Gestion des questionnaires
          </Button>
          <Button
            onClick={() =>
              handleViewChange({ quiz: false, stats: true, admin: false })
            }
            variant='contained'
            color='secondary'
            startIcon={<FontAwesomeIcon icon='fa-fw fa-solid fa-chart-pie' />}
            sx={{ opacity: view.stats ? '100%' : '75%' }}
          >
            Statistiques
          </Button>
          <Button
            onClick={() =>
              handleViewChange({ quiz: false, stats: false, admin: true })
            }
            variant='contained'
            color='secondary'
            startIcon={<FontAwesomeIcon icon='fa-fw fa-solid fa-user-tie' />}
            sx={{
              opacity: view.admin ? '100%' : '75%',
            }}
          >
            Gestion admin
          </Button>
        </Stack>
        <Stack
          container
          spacing={3}
          direction={'row'}
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          {!view.admin && (
            <Stack height={'100%'}>
              <SideBar lockEdit={view.stats} />
            </Stack>
          )}
          {view.quiz && <QuizAdministration />}
          {view.stats && <Synthese />}
          {view.admin && <AdminGestion />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminConsole;
