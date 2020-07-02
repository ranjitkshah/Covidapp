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
        axios.get(`https://api.steinhq.com/v1/storages/5e732accb88d3d04ae0815ae/StateWiseHealthCapacity`)
            .then((result) => {
                console.log(result.data)
                setBedCount(result.data)

            }).catch((err) => {
                console.log(err)

            });
    }, [])

    if (bedCount[0] != null) {
        // bedCount.map(data => console.log(data.State))
        console.log(bedCount)
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
                    data: [count.TotalBedsCount, count.TotalHospitalsCount],
                  },
                ],
              }}
            options={{
                legend:{display:false},
                title:{display:true , text:`Hospitals & Beds in ${count.State}`},
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
                    options={bedCount}
                    getOptionLabel={(option) => option.State}
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
