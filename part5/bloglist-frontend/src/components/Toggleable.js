import { useState, forwardRef, useImperativeHandle } from 'react'
const Toggleable = (props, refs) => {
    const [visibility, setVisibility] = useState(false)
    const toggleVisibility = () => {
        setVisibility(prev => !prev)
    }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <>
            <div style={{ display: visibility ? '' : 'none' }}>
                {props.children}
            </div>
            <button onClick={toggleVisibility}>{visibility ? 'cancel' : 'new note'}</button>
        </>
    )
}

export default forwardRef(Toggleable)