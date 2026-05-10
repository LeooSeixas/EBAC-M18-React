import { useContext, useState } from "react"
import { TaskContext } from "../contexts/TaskContext"

function Filter() {
    const { filter, setFilter } = useContext(TaskContext)

    return(
        <>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="done">Concluídas</option>
                <option value="pendent">Pendentes</option>
            </select>
        </>
    )
}

export default Filter