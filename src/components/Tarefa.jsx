import { memo } from 'react'

const Tarefa = memo(function Tarefa({text}) {
    return (
        <span>{text}</span>
    )
})

export default Tarefa