import React, {useState } from 'react';
import "./Todo.css";
import List from './components/List';
import TodoForm from './components/TodoForm';
import './Todo.css'
import Modal from './components/Modal';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import listReducer from './reducers/listReducer';





const saved_items = "SavedItems"

function persistState(state){
    localStorage.setItem(saved_items, JSON.stringify(state));
}

function loadState(){
    const actualState = localStorage.getItem(saved_items);
    if(actualState){
        return JSON.parse(actualState);
    } else{
        return [];
    }
   
   
    
}
const store = createStore(
    listReducer, loadState()
)

store.subscribe(()=>{
    persistState(store.getState());
})

function App() {
    const [showModal, setShowModal] = useState(false);


   

    function onHideModal() {
        setShowModal(false);
    }

    return (
        <div className="container">
            <Provider store={store}>
                <header className='header'>
                    <h1>To Do List</h1>
                    <button onClick={() => { setShowModal(true) }} className='addButton'>
                        +
                    </button>
                </header>

                <List></List>
                <Modal show={showModal} onHideModal={onHideModal}>
                    <TodoForm onHideModal={onHideModal}></TodoForm>
                </Modal>
            </Provider>
        </div>
    );
}

export default App;