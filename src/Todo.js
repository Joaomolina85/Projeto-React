import React, { useEffect,useState  } from 'react';
import "./Todo.css";
import List from './components/List';
import TodoForm from './components/TodoForm';
import Item from './components/Item';
import './Todo.css'
import Modal from './components/Modal';

const saved_items = "SavedItems"

function Todo() {
    const [showModal,setShowModal] = useState(false);

    // const [text, setText] = React.useState("");
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(saved_items));
        if (savedItems) {
            setItems(savedItems);
        }

    }, []);


    useEffect(() => {
        localStorage.setItem(saved_items, JSON.stringify(items));
    }, [items]);

    function onAddItem(text) {
        let it = new Item(text);
        setItems([...items, it]);
        onHideModal();
    }

    function onItemDeleted(item) {
        let filteredItems = items.filter(it => it.id !== item.id);
        setItems(filteredItems);
    }

    function onDone(item) {
        let updateItems = items.map(it => {
            if (it.id === item.id) {
                it.done = !item.done;
            }
            return it;
        })
        setItems(updateItems);
    }

    function onHideModal(){
        setShowModal(false);
    }   

    return (
        <div className="container">
            <header className='header'>
                <h1>To Do List</h1>
                <button onClick={()=>{setShowModal(true)}} className='addButton'>
                    +
                </button>
            </header>

            <List onDone={onDone} onItemDeleted={onItemDeleted} items={items}></List>
            <Modal show={showModal} onHideModal={onHideModal}>
                <TodoForm onAddItem={onAddItem}></TodoForm>
            </Modal>
        </div>
    );
}

export default Todo;