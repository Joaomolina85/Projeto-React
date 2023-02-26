import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/listAction';

function TodoForm(props) {
    const dispatch = useDispatch();
    
    const [text, setText] = React.useState("");

    function addItemEvent(event) {
        event.preventDefault(); //evita que o botao seja redirecionado
        if (text) {
            // setItems([...items, text]);
            dispatch(addItem(text));
            setText("");
            props.onHideModal();
        }
    }

    function handleChange(event) {
        let pegandoValorInput = event.target.value;
        setText(pegandoValorInput);
    }

    return (
        <form>
            <input className='botaoAdd' onChange={handleChange} type="text" value={text} />
            <button className='botaoAdd'  onClick={addItemEvent}>Adicionar Item</button>
        </form>
    )
}

export default TodoForm;