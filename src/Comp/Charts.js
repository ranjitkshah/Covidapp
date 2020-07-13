import React, { useState, useEffect } from 'react'
import styles from '../CSS/Charts.module.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import chart from 'chart.js'
import { Bar } from 'react-chartjs-2';


function Charts() {

    const [bedCount, setBedCount] = useState([])
    const [count, setCount] = useState('')

    useEffect(() => {
        axios.get(`https://api.rootnet.in/covid19-in/hospitals/beds`)
            .then((result) => {
                console.log(result.data.data)
                setBedCount(result.data.data)

            }).catch((err) => {
                console.log(err)

            });
    }, [])

    if (bedCount.summary!= null) {
        // bedCount.map(data => console.log(data.State))
        console.log(bedCount.regional)
    }


    
    // console.log(count.TotalBedsCount)
    
    const barChart = (
        count?(
            <Bar
            data={{
                labels: ['No. of total beds', 'No. of hospitals'],
                datasets: [
                  {
                    label: 'count',
                    backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)'],
                    data: [count.totalBeds, count.totalHospitals],
                  },
                ],
              }}
            options={{
                legend:{display:false},
                title:{display:true , text:`Hospitals & Beds in ${count.state}`},
            }}
            />
        ):null

    )


    return (
        <div className={styles.container}  >
                <span className={styles.charthead} >Information about Hospitals & bed counts</span>
                { bedCount&&<Autocomplete
                    id="combo-box-demo"
                    onChange={(e, value) =>
                        setCount(value)}
                    options={bedCount.regional}
                    getOptionLabel={(option) => option.state}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" />}
                />
                }

                <div className={styles.chart} >

                {barChart}
                </div>
                


        </div>
    )
}

export default Charts
