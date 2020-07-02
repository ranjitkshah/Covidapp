import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from '../CSS/Cards.module.css'
import Countup from 'react-countup'
import cx from 'classnames'


function Cards({ States }) {



    // if (!States.regional) {
    //     console.log(States)

    //     console.log(States.regional)
    //     return 'Loading....'
    //     // Dataone.regional.map(data => {
    //     //     console.log(data.confirmedCasesIndian)
    //     // })
    // }


    const [id, setid] = useState('')







    if (States.summary != null) {
        console.log(States.regional)
        // States.regional.map(data =>{
        //     console.log(data.loc)
        // })
    }




    return (
        <>


            <div className={styles.container}>
            <span className={styles.cardhead} >State-wise COVID-19 Cases</span>
            {States.regional &&
                <Autocomplete
                id="combo-box-demo"
                onChange={(e, value) =>
                    setid(value)}
                    options={States.regional}
                    getOptionLabel={(option) => option.loc}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" />}
                    />
                }

            {
                id && <Grid   item component={Card} xs={12}  className={styles.card} >
                    <CardContent className={styles.content} >
                        <h5>{id.loc}</h5>
                        <p className={styles.confirmed} >Confirmed : {id.totalConfirmed}</p>
                        <p className={styles.recovered} >Recovered : {id.discharged} </p>
                        <p className={styles.deaths} >Deaths : {id.deaths}</p>
                       
                    </CardContent>
                </Grid>
            }
            </div>

        </>
    )
}

export default Cards





























{/* <div className={styles.formcontrol} >
    <div className={styles.select} > Select state from below </div>
    <FormControl >
        <Select
            native
            onChange={onselect}
        >
            {
                States.regional && States.regional.map((data, index) =>
                    <option key={index} value={index}  >{data.loc}</option>)
            }

        </Select>

    </FormControl>   
</div> */}