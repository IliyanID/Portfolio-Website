import { useState } from 'react'
export const useToggle = (input) =>{
    const [value,setValue] = useState(input);
    const toggle = () =>{
        setValue(!value)
    }
    return [value,toggle]
}
export default useToggle;