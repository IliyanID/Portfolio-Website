import React from 'react'
const TextEditor = (props) =>{
    return(
        <section className='main section'>
            <input placeholder={props.content} type='text'/>
        </section>
    )
}

export default TextEditor;