import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';

export const ColorComponent = () => {
  const [colorList, setColorList] = useState([])
  const [backgroundColor, setBackgroundColor] = useState('')

  return <div>
    <input style={{ backgroundColor }} onChange={event => {
      setBackgroundColor(event.target.value)
    }} />
    <button onClick={() => setColorList([...colorList, backgroundColor])}>Add Color</button>

    {colorList.map(item => <ColorBox color={item} />)}
  </div>
}

const ColorBox = (props) => {
  const { color } = props
  return <div style={{ height: 200, width: 400, backgroundColor: color, margin: 10 }} />
}