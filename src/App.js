import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState();
  
  const setEditTask = (value, id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: value } : task
      )
    )
  }

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
              onChange={(event) => setEditTask(event.target.value, task.id)}/>

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
            </div>
          )}
        </li>
      ))}
    </div>
  );
}

export default App;