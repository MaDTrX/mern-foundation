
import * as React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as userService from '../../utilities/users-service';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"



export default function NavBar({ user, hide, setUser, setData, checked, handleChange, schools, home }) {
//   const [accordion, setAccordion] = React.useState([])
  const [credentials, setCredentials] = React.useState(null)
//   const [subDivision, setSubDivision] = React.useState('')
  const [navState, setNavState] = React.useState(false)
//   const accordionNav = accordion.map(el => <Grid item xs={12} md={12} lg={6}><Button onClick={handleNav} value={el} fullWidth={true}>{el}</Button></Grid>)

  React.useEffect(() => {
    if (hide === undefined) setNavState(false)
  }, [hide])

  function handleCred(evt) {
    if (evt.target.value === 'signUp') {
      setCredentials(<SignUpForm setUser={setUser} />)
    } else if (evt.target.value === 'logIn') {
      setCredentials(<LoginForm setUser={setUser} />)
    }
  }

  function handleStyle() {
    if (checked) {
      return 'rgb(0, 0, 0, 0)'
    }
    else {
      return 'rgba(0, 0, 0, 0)'
    }
  }

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }




  function handleAccordion(evt) {
    if (evt.target.value === 'fbs') {
      setNavState(true)
    //   setAccordion(fbsConferences)
    //   setSubDivision(evt.target.value)

    } else if (evt.target.value === 'fcs') {
      setNavState(true)
    //   setAccordion(fcsConferences)
    //   setSubDivision(evt.target.value)

    } else if (evt.target.value === 'logIn' || evt.target.value === 'signUp') {
      setNavState(true)
    }
  }

  return (
    <Accordion sx={{ background: handleStyle, width: '100%', position: 'absolute', top: '0', boxShadow:'none'}} expanded={navState} onClick={handleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {user ?
          <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6} container direction="row">
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Button onClick={handleAccordion} variant="text" value="home"></Button>
                <Button onClick={handleCred} sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="signUp">FLIGHTS</Button>
            <Button onClick={handleCred} sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }}  variant="text" value="logIn">HOTEL</Button>
            <Button onClick={handleCred} sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }}  variant="text" value="logIn">TOURS</Button>
        
              </Grid>
              <Grid
                item xs={6}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
        
                <Button onClick={handleLogOut}  sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }}  variant="text" value="account">LOGOUT</Button>

              </Grid>
            </Grid>
          </>
          :
          <>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={handleCred} sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="signUp">SIGN UP</Button>
            <Button onClick={handleCred} sx={{ color: 'black',  letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }}  variant="text" value="logIn">LOG IN</Button>

          </>
        }
      </AccordionSummary>
      <Accordion sx={{ background: handleStyle }}>
        <AccordionDetails  sx={{ width: {md: "50%", sm: "100%"}, margin: "auto"}}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              alignItems="center"
    
            >
              {user ?
                <>
                  {/* {accordionNav} */}
                </>
                :
                <>
                  {credentials}
                </>
              }
            </Grid>
        </AccordionDetails>
      </Accordion>
    </Accordion>

  );
};