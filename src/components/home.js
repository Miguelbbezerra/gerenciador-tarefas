import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editId, setEditId] = useState(null);

    const API_URL = "http://localhost:3001/tasks";

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Erro ao carregar tarefas:", error));
    }, []);

    const setEditTask = (value, id) => {
        const updatedTask = { ...tasks.find((task) => task.id === id), text: value}

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        })
            .then(() => {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, text: value } : task
                    )
                )
            })
            .catch((error) => console.error("Erro ao editar tarefa:", error));
    }

    const addTask = () => {
        if (task.trim() === "") return;
        const newTask = { text: task, completed: false };

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => setTasks([...tasks, data]))
            .catch((error) => console.error("Erro ao adicionar tarefa:", error));

        setTask("");
    };

    const toggleTask = (id) => {
        const taskToToggle = tasks.find((task) => task.id === id)
        const updatedTask = { ...taskToToggle, completed: !task.completed }

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        })
            .then(() => {
                setTasks(
                    tasks.map((task) =>
                        task.id === id ? { ...task, completed: !task.completed } : task
                    )
                );
            })
            .catch((error) => console.error("Erro ao concluir/desconcluir tarefa: ", error))
    };

    const removeTask = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
            .then(() => setTasks(tasks.filter((task) => task.id !== id)))
            .catch((error) => console.error("Erro ao remover tarefa: ", error))
    };

    return (
        <div>
            <h1>Gerenciador de tarefas</h1>
            <div>
                <input
                    placeholder="Digite o nome da tarefa"
                    type="text"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <button onClick={addTask}>Adicionar Tarefa</button>
            </div>
            {tasks.map((task) => (
                <li key={task.id} style={{ color: task.completed ? "green" : "black" }}>
                    {editId === task.id ? (
                        <div>
                            <input type="text"
                                value={task.text}
                                onChange={(event) => setEditTask(event.target.value, task.id)} />

                            <button onClick={() => setEditId()}>Fechar Edição</button>
                        </div>
                    ) : (
                        <div>
                            {task.text}
                            {task.completed ? (
                                <button onClick={() => toggleTask(task.id)}>Desconcluir</button>
                            ) : (
                                <button onClick={() => toggleTask(task.id)}>Concluir</button>
                            )}

                            <button onClick={() => removeTask(task.id)}>Remover</button>
                            <button onClick={() => setEditId(task.id)}>Editar</button>
                            <Link to={"/task/" + task.id}>Ver Mais</Link>
                        </div>
                    )}
                </li>
            ))}
        </div>
    );
}
export default Home