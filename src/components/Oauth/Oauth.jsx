import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
export default function Oauth () {
    const google = () => {
      window.open("http://localhost:5000/auth/google", "_self");
    };
  
    const github = () => {
      window.open("http://localhost:5000/auth/github", "_self");
    };
  
    return (
    <Grid 
    item xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space evenly'}}>
            <Button variant="contained" startIcon={<GoogleIcon />} onClick={google} sx={{backgroundColor:'rgb(220,74,56)', color: 'white' , width:'100%', margin: 'auto'}}>
            Login With Google
            </Button>
            
            <Button  variant="contained"  startIcon={<GitHubIcon/>} onClick={github} sx={{backgroundColor:'#0d1117', color: 'white', width:'100%', margin:'auto'}}>
            Login With Github
            </Button>
    </Grid>
    );
};
  
