import React from 'react';
import profile_pic_2 from '/public/images/profile_pic_2.jpg'
import { Container, Typography, Box, Paper, Grid, Chip, LinearProgress } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import BrushIcon from '@mui/icons-material/Brush';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

function About () {
  const skills = {
    digital_design_software: [
      { name: 'Procreate', level: 85 },
      { name: 'Photoshop', level: 80 },
      { name: 'Adobe Illustrator', level: 73 },
      { name: 'Adobe After Effects', level: 78 },
    ],
    cgi_software: [
      { name: 'Blender', level: 85 },
      { name: 'Mya', level: 65 },
    ],
    tools: [
      'Git',
      'VS Code',
      'npm',
      'Webpack',
      'Vite',
    ]
  }
  return (
    <div className='about'>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={7} sx={{ p: 3, backgroundColor: "var(--card-bg)", borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img 
                  className='profile-pic' 
                  style={{
                    borderRadius: '10%',
                    border: '4px solid #fff',
                    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                    marginBottom: '1rem'
                  }} 
                  height={200} 
                  src={profile_pic_2} 
                  alt="profile pic" 
                />
                <Typography variant="h4" gutterBottom sx={{ color: "var(--text-color)" }}>
                  Ali Abdur-Razzaq
                </Typography>
                <Typography variant="h6" sx={{ color: "var(--text-color)"}} gutterBottom>
                  Concept artist and illustrator
                </Typography>
                <Typography variant="h8" sx={{ color: "var(--text-color)"}} gutterBottom>
                  I am a illustrator and concept artist who loves to create digital art and 3D models. <br></br>
                  I graduated from the Columbus College of Art and Design with a degree in Illustration as well as studing comercial art independantly for many years. <br></br>
                  I have fufilled the business and creative needs of many clients seeking my services and I would be a tremendous asset to your team's project.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={7} sx={{ p: 4, backgroundColor: "var(--card-bg)", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 , color: "var(--text-color)"}}>
                <BrushIcon /> Digital Painting
              </Typography>
              <Box sx={{ mb: 4 }}>
                {skills.digital_design_software.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 , color: "var(--text-color)"}}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Typography sx={{color: "var(--text-color)"}} variant="body2">{skill.level}%</Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                          backgroundImage: "var(--progress-bar-color)",
                        }
                      }}
                  />
                  </Box>
                ))}
              </Box>

              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 , color: "var(--text-color)"}}>
                <ViewInArIcon /> 3D Modeling
              </Typography>
              <Box sx={{ mb: 4 }}>
                {skills.cgi_software.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 , color: "var(--text-color)"}}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Typography variant="body2" sx={{color: "var(--text-color)"}} color="textSecondary">{skill.level}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.level} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundImage: "var(--progress-bar-color)",
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Box>

              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 , color: "var(--text-color)"}}>
                <CodeIcon /> Tools & Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.tools.map((tool) => (
                  <Chip 
                    key={tool} 
                    label={tool} 
                    sx={{ 
                      backgroundColor: 'rgb(41, 29, 81)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgb(61, 49, 101)',
                      }
                    }} 
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default About;
