import { useContext } from "react";
import useInput from "../hooks/useInput";
import { TaskContext } from "../contexts/TaskContext";

function NewTask() {
    const input = useInput('');
    const {tasksList, setTask} = useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newId = Date.now();
        
        const newTesk = {
            id: newId,
            text: input.value,
        }
        if(input.value === '' || input.value.length <= 1){
            alert('Campo nova tarefa vazio ou incorreto!')
            return;
        }
        setTask([...tasksList, newTesk])
        input.limpar();
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
            <input type='text' 
                placeholder="Digite uma tarefa"
                value = {input.value}
                onChange={input.onChange}
            />
            <button type="submit">Adicionar tarefa</button>
            </form>
        </>
    )
}

export default NewTask