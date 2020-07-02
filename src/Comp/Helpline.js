import React,{useState,useEffect} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from '../CSS/Helpline.module.css'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

function Helpline() {

    const [help, setHelp] = useState('')
    const [number, setNumber] = useState('')

    useEffect(() => {
        axios.get(`https://api.rootnet.in/covid19-in/contacts`)
        .then((result) => {
            console.log(result.data.data.contacts)
            setHelp(result.data.data.contacts)
            
        }).catch((err) => {
            console.log(err)
            
        });
        
        
    }, [])

    if(help.primary!=null){
        console.log(help.regional)
    }


    console.log(number)



    return (
        <div className={styles.container}>
            <span className={styles.cardhead} >State-wise Helpline Info. </span>
            {
                help&&<Autocomplete
                id="combo-box-demo"
                onChange={(e, value) =>
                    setNumber(value)}
                options={help.regional}
                getOptionLabel={(option) => option.loc}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" />}
            />
            }
                {
                number&&
                <div className={styles.helpbox}>
                    <h5>
                            {number.loc}
                    </h5>
                    
                    <ContactPhoneIcon fontSize="large"/>
                    <p>
                        
                        {number.number}

                    </p>   
        
                </div>

                }
            
        </div>
    )
}

export default Helpline
