import React,{useState} from 'react'

export default function App() {
    const [bgcolor, setbgcolor] = useState('red');

    const Arr = ["red", 'green', 'yellow', 'blue'];
  return (
    <div style={{backgroundColor: bgcolor}}>
        {
            Arr.map((i) => 
            <button onClick={() => setbgcolor(i)}>{i}</button>)
        }
    </div>
  )
}
