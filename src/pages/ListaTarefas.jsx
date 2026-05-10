import { useState } from "react";
import NovaTarefa from "../components/NovaTarefa";
import Tarefa  from "../components/Tarefa";
import { TaskContext } from "../contexts/TaskContext";
import Filter from "../components/Filter";
import '../App.css'


function ListaTarefas () {
    const [filter, setFilter] = useState('all');

    const [tasksList, setTask] = useState([
        {id: Date.now(), text: 'Tarefa 1'}
    ]);

    const [taskDone, setDone] = useState([
        {id: Date.now()+1, text: 'Tarefa 2'}
    ]);

    const removeItem = (id) => {
        setTask(tasksList.filter(item => item.id !== id));
        setDone(taskDone.filter(item => item.id !== id));
    };
    
    const done = (id) => {
        const addDone = tasksList.find(item => item.id === id);
        setDone([...taskDone, addDone]);
        setTask((tasksList.filter(item => item.id !== id)))
    }

    const unDone = (id) => {
        const unDone = taskDone.find(item => item.id === id)
        if(unDone){
            setTask([...tasksList, unDone]);
            setDone(taskDone.filter(item => item.id !== id));        
        }

    }

    const showDone =  (filter === 'all' || filter ==='done') && taskDone.length > 0;

    return(
        <TaskContext.Provider value={{tasksList, setTask, taskDone, setDone, filter, setFilter}}>
            <div className="container-geral ">
                <NovaTarefa/>
                <p>Filtrar por: </p>
                <Filter/>
                {(filter ==='all' || filter ==='pendent') && (tasksList.length > 0 ? (
                    <>
                        <h3>Tarefas pendentes:</h3>
                        <ul>
                            {tasksList.map(task => (
                                <li key={task.id}>
                                    <Tarefa text={task.text}/>
                                    <button className="btn-done" onClick={() => done(task.id)}>Concluida</button>
                                    <button className="btn-remove" onClick={() => removeItem(task.id)}>Remover</button>
                                </li>
                            ))}               
                        </ul>
                    </>
                    ) : (
                        <p>Sem tarefas pendentes!</p>
                    )
                )}
                {(filter === 'all' || filter ==='done') && (taskDone.length > 0 ? (
                    <>
                        <h3>Tarefas concluídas:</h3>
                        <ul>
                            {taskDone.map(task => (
                                <li key={task.id}>
                                    <Tarefa text={task.text}/>
                                    <button className="btn-undo" onClick={() => unDone(task.id)}>Desfazer</button>
                                    <button className="btn-remove" onClick={() => removeItem(task.id)}>Remover</button>
                                </li>
                            ))}
                        </ul>
                    </>
                    ) : (
                        <p>Nenhuma tarefa concluída</p>
                    )
                )}
            </div>
        </TaskContext.Provider>
    )
}

export default ListaTarefas