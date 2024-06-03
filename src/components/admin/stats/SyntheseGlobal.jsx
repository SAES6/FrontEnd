import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SyntheseGlobal = ({ statsTypeUser }) => {
  const themeSynthese = useTheme();

  return (
    <React.Fragment>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          border: 'solid 1px #A5C2D7',
          width: 1100,
          margin: '20px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '36px',
            color: themeSynthese.palette.text.primary,
          }}
        >
          Synthèse
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            borderTop: 'solid 1px #A5C2D7',
            padding: 2,
            backgroundColor: 'white',
            height: '500px', // Ajout de la hauteur
          }}
        >
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}`,
                arcLabelMinAngle: 45,
                data: statsTypeUser.map((item) => ({
                  label: `Users: ${item.type}`, // Adapté pour tester
                  value: item.total,
                })),
                innerRadius: 0,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 300,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
                cx: -50,
                cy: 150,
              },
            ]}
            sx={{
              [`& .${statsTypeUser.map((item) => item.total).join(', ')}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },
            }}
            width={500}
            height={500} // Ajout de la hauteur
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SyntheseGlobal;
