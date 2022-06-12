import Button from '@mui/material/Button';
export default function Oauth () {
    const google = () => {
      window.open("http://localhost:5000/auth/google", "_self");
    };
  
    const github = () => {
      window.open("http://localhost:5000/auth/github", "_self");
    };
  
    // const facebook = () => {
    //   window.open("http://localhost:5000/auth/facebook", "_self");
    // };
    // const twitter = () => {
    //   window.open("http://localhost:5000/auth/twitter", "_self");
    // };
  
    return (
     <>
            <Button onClick={google}>
            Login With Google
            </Button>
            <Button onClick={github}>
            Login With Github
            </Button>
    </>
    );
};
  
