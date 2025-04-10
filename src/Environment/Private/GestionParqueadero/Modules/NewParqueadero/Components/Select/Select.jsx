import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export default function BasicSelect({titulo,data,Value,setValue}) {
//   const [Value, setValue] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value);
  };

  

  return (
    <Box sx={{ minWidth: 120 }}>
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
  );
}