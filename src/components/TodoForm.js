import React,{useState} from 'react';

function TodoForm(props) {
    
    const [text, setText] = React.useState("");

    function addItem(event) {
        event.preventDefault(); //evita que o botao seja redirecionado
        if (text) {
            // setItems([...items, text]);
            props.onAddItem(text);
            setText("");
        }
    }

    function handleChange(event) {
        let pegandoValorInput = event.target.value;
        setText(pegandoValorInput);
    }

    return (
        <form>
            <input className='botaoAdd' onChange={handleChange} type="text" value={text} />
            <button className='botaoAdd'  onClick={addItem}>Adicionar Item</button>
        </form>
    )
}

export default TodoForm;