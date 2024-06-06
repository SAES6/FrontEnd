import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import React from 'react';

const textSections = {
  title: 'À Propos',
  intro:
    "De l’évaluation de la crédibilité des sources d'information par les journalistes aux décisions quotidiennes prises par le grand public basées sur les nouvelles consommées, l'appréciation de la valeur de l'information joue un rôle crucial dans notre société de l'information.",
  second:
    "L'importance accordée à différents types d'informations peut varier significativement entre professionnels de l'information et le grand public, entraînant des perspectives diverses sur ce qui est considéré comme «valeur de l'information».",
  third:
    "Cette diversité de perceptions nécessite une analyse approfondie pour comprendre comment les différents groupes utilisent et valorisent l'information dans leurs prises de décisions.",
  fourth:
    'Les études récentes soulignent l’importance de saisir ces nuances, et notre site web est conçu pour explorer ces aspects en profondeur.',
  breakLabel: 'Il offre une plateforme pour :',
  firstPoint:
    "Examiner et comparer les perceptions de la valeur de l'information entre journalistes et le grand public à travers des réponses à des scénarios soigneusement élaborés.",
  secondPoint:
    'Recueillir des données précieuses qui aideront à modéliser ces perceptions et à en débattre pour mieux comprendre les critères derrière ces jugements.',
};

const About = () => {
  return (
    <Stack>
      <Stack
        width={'100%'}
        mt='50px'
        fontFamily={'Poppins'}
        fontSize={'16px'}
        fontWeight={'400'}
      >
        <Accordion sx={{ overflow: 'hidden' }}>
          <AccordionSummary
            expandIcon={
              <FontAwesomeIcon
                fixedWidth
                icon='fa-fw fa-chevron-down'
                fontSize={'20px'}
              />
            }
            sx={{
              borderRadius: '15px 15px 0 0',
            }}
          >
            {textSections.title}
          </AccordionSummary>
          <AccordionDetails>
            <Stack gap={6}>
              <Stack gap={2}>
                <Stack textAlign={'justify'}>{textSections.intro}</Stack>
                <Stack direction={'row'} gap={5}>
                  <Stack textAlign={'justify'} width={'100%'}>
                    {textSections.second}
                  </Stack>
                  <Stack textAlign={'justify'} width={'100%'}>
                    {textSections.third}
                  </Stack>
                </Stack>
                <Stack textAlign={'justify'}>{textSections.fourth}</Stack>
              </Stack>
              <Stack gap={2}>
                <Stack textAlign={'justify'} fontWeight={'600'}>
                  {textSections.breakLabel}
                </Stack>
                <Stack direction={'row'} gap={5}>
                  <Stack textAlign={'justify'} width={'100%'}>
                    {textSections.firstPoint}
                  </Stack>
                  <Stack textAlign={'justify'} width={'100%'}>
                    {textSections.secondPoint}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default About;
