import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Instructions: React.FC = () => {
  const instructions = [
    'You need a Desktop / Laptop and a stable internet to appear for this contest. Make sure your Desktop / Laptop is plugged in or is sufficiently charged.',
    'You must write the contest in fullscreen mode. Ensure your cursor remains within the contest window during the entire contest.',
    'Once you successfully submit the code for any particular problem, revisiting or reattempting that specific problem will not be possible.',
    'In case of any technical problems during the contest, you can refresh the page or try to logout / login.',
    'Stay focussed and try not to take any breaks during the entire contest.',
    'Refrain from using your mobile phone during the entire contest.',
    'If you are logged out during the contest, please login again.',
    'If after running / submitting the code you encounter issues such as Compile Time Error / Run Time Error / Time Limit Exceeded / Wrong Answer, please note that the issue lies within your code. Kindly revisit and review your code for errors.',
    'Please be aware that the timer will change to red colour / blink during the final few minutes.',
    'Make sure you submit all your codes before ending the contest.',
  ];

  return (
    <Box
      marginTop="40px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          maxWidth: 1000,
          border: '3px solid #6A1B9A',

          p: 4,


        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Contest Instructions
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          {instructions.map((text, index) => (
            <ListItem key={index} sx={{ display: 'list-item', py: 0.5 }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Instructions;