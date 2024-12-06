import { Link, useParams } from "react-router-dom"

const TaskInfo = () => {
    const {id} = useParams()
    return (
        <>
        <Link to="/">Voltar</Link>
            {id}
        </>
    )
}
export default TaskInfo