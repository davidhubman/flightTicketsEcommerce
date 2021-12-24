import React, { useEffect, useState } from 'react'


export default function SeatBox({numberAndLetter, available, pax}) {

    const [input, setInput] = useState([])


    function handleCheck(e) {
        let finalSeats = e.target.value
        var newInput = [...input]
        newInput.push(finalSeats)
        setInput(newInput)
        console.log(input)
    }

    return (
        <div>
            { available.length === 0
                ? <div>
                    <input type="checkbox" name="libre"
                           id={numberAndLetter}
                           value={numberAndLetter}
                           onChange={(e)=> handleCheck(e)}/>
                </div>
                : <div >
                    <input
                        type="checkbox"
                        name="ocupado"
                        value="ocupado"
                        disabled >
                    </input></div>
            } <p>{numberAndLetter}</p>
        </div>
    )
}