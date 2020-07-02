import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid ,IconButton } from '@material-ui/core'
import styles from './App.module.css';
import Cards from './Comp/Cards';
import Charts from './Comp/Charts';
import image from './images/image.png'
import Helpline from './Comp/Helpline';
import Countup from 'react-countup'
import cx from 'classnames'
import Button from '@material-ui/core/Button';
import MapIcon from '@material-ui/icons/Map';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


function App() {

  const [States, setStates] = useState({})
  const [option, setOption] = useState({
    btn1: true,
    btn2: false,
    btn3: false
  })

  const optionHandler1 = () => {
    setOption({
      btn1: true,
      btn2: false,
      btn3: false
    })
  }

  const optionHandler2 = () => {
    setOption({
      btn1: false,
      btn2: true,
      btn3: false
    })
  }

  const optionHandler3 = () => {
    setOption({
      btn3: true,
      btn2: false,
      btn1: false
    })
  }

  var toggleScreen;
  if (option.btn1 === true) {
    toggleScreen = <Cards States={States} />
  }
  if (option.btn2 === true) {
    toggleScreen = <Charts />
  }
  if (option.btn3 === true) {
    toggleScreen = <Helpline />
  }

  useEffect(() => {
    async function asyncData() {
      try {

        const response = await fetch(`https://api.rootnet.in/covid19-in/stats/latest`);
        const resdata = await response.json();

        setStates(resdata.data);

      } catch (error) {
        console.log(error);
        setStates([])

      }

    }
    asyncData();

  }, []);

  if (States.regional != null) {
    console.log(States.summary)
  }

  return (
    <div className={styles.container}>
      <span className={styles.navlabel} > Stay Home , Stay Safe </span>
      <img className={styles.image} src={image} alt="COVID-19" ></img>


      <Grid container spacing={4} justify="center" >
        {States.summary && <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.total)} >
          <CardContent className={styles.content} >
            <h5 className={styles.cardlabel} > Total infected (India) </h5>
            <Typography variant="h5" >
              <Countup start={0} end={States.summary.total} duration={2.5} separator="," />
            </Typography>
            <p> {new Date().toDateString()}</p>
          </CardContent>
        </Grid>
        }

        {States.summary && <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)} >
          <CardContent className={styles.content} >
            <h5 className={styles.cardlabel} > Recovered (India) </h5>
            <Typography variant="h5" >
              <Countup start={0} end={States.summary.discharged} duration={2.5} separator="," />
            </Typography>
            <p> {new Date().toDateString()}</p>
          </CardContent>
        </Grid>
        }

{States.summary && <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)} >
          <CardContent className={styles.content} >
            <h5 className={styles.cardlabel} >Deaths (India) </h5>
            <Typography variant="h5" >
              <Countup start={0} end={States.summary.deaths} duration={2.5} separator="," />
            </Typography>
            <p> {new Date().toDateString()}</p>
          </CardContent>
        </Grid>
        }

      </Grid>

        <span className={styles.optionlabel}> Select Option from the below</span>
      <div className={styles.middleHead} >

      <IconButton aria-label="cases state-wise" className={styles.btn} color="primary" size="large" onClick={optionHandler1} id="btn1" >
        <MapIcon className={styles.btnIcon} />
      </IconButton>
      
      <IconButton aria-label="hospital stats" className={styles.btn} color="primary" size="large" onClick={optionHandler2} id="btn2" >
        <HotelIcon className={styles.btnIcon} />
      </IconButton>
      
      <IconButton aria-label="helpline" className={styles.btn} color="primary" size="large" onClick={optionHandler3} id="btn3" >
        <PhoneInTalkIcon className={styles.btnIcon}  />
      </IconButton>

      
     


        

      </div>
      {toggleScreen}
      <div className={styles.footer} >
        <h5>Developed by <a target="blank" href="https://meghalbisht.github.io/Ranjit-Resume/" > ranjitkshah </a> </h5>
        <a target="blank" href="https://www.linkedin.com/in/ranjit-shah-b94b7a1a8/" ><LinkedInIcon fontSize="large" /></a>
        <a target="blank" href="https://github.com/ranjitkshah" > <GitHubIcon fontSize="large" /></a>
        
      </div>

    
    </div>
  );
}

export default App;
