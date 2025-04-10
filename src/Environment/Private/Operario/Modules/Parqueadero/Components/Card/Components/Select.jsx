import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';

export default function BasicSelect({arr,titulo,onChange=false,style=false,valor='',readOnly=false}) {
  const [age, setAge] = React.useState(valor);

  const handleChange = (event) => {
    setAge(event.target.value);
    if(onChange!=false){
        onChange(event.target.value)
    }
  };

  useEffect(() => {
    console.log(valor)
    if(arr.length===0){
        // alert('vacio')
        setAge('')
    }
  
    
  }, [arr])

  useEffect(() => {
    console.log(valor)
    setAge(valor)
    
  
    
  }, [valor])
  

  return (
    <Box sx={{ width:'100%' }} style={style?style:null}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{titulo}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          disabled={readOnly}

        >
            {/* <MenuItem key={0} value={0}></MenuItem> */}
            {
                arr.map((child)=>
                    <MenuItem key={child.value} value={child.value}>{child.text}</MenuItem>
                )
            }
          
          
        </Select>
      </FormControl>
    </Box>
  );
}