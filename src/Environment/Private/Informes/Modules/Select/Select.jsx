import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export default function BasicSelect({titulo,data,Value,setValue,i=false,input=false}) {
//   const [Value, setValue] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    console.log(i)
    console.log(input)
    if(i!==false && input!==false){
      setValue(event.target.value,i,input);
    }else{
      setValue(event.target.value);
    }
    
  };

  

  return (
    <div style={{width:'100%'}}>
      <Box sx={{ minWidth: 100 }} >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{titulo}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Value}
            label={titulo}
            onChange={handleChange}
            
          >
              
              {
                  data.map((child)=>
                      <MenuItem key={child.value} value={child.value}>{child.text}</MenuItem>
                  )
              }
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}