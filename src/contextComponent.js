import { useState, useContext, createContext } from 'react';
import { Badge, Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';

// const context = createContext({ state: 40 })
const context = createContext(null)

const ContextComponent = () => {

    // const [state, setState] = useState(10)
    // const obj = { state: state, setState: setState }

    // return <context.Provider value={obj}>
    //     <MyChild />
    // </context.Provider>

    const [mode, setMode] = useState('light')
    const arr = [mode, setMode]
    const styles = { backgroundColor: mode === 'light' ? 'black' : 'white' }
    return <context.Provider value={arr}>
        <div style={styles}>
            <List />
        </div>
    </context.Provider>

}

const List = () => {
    return <div>
        <ListItem value={'light'} />
        <ListItem value={'dark'} />
    </div>

}

const ListItem = ({ value }) => {
    return <Button value={value}></Button>
}

const Button = ({ value }) => {
    const [mode, setMode] = useContext(context)
    const styles = {
        backgroundColor: mode === 'light' ? 'black' : 'white',
        color: mode === 'light' ? 'white' : 'black'
    }
    return <button onClick={() => setMode(value === 'light' ? 'dark' : 'light')} style={styles}>{value}</button>
}




// const MyChild = () => {
//     return <div>
//         <MyGreatChild />
//     </div>
// }


// const MyGreatChild = () => {
//     const { state, setState } = useContext(context)
//     return <div>
//         <button onClick={() => setState(state + 1)}>{state}</button>
//     </div>
// }

export default ContextComponent