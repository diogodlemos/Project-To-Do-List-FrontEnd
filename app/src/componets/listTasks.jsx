import React, { useEffect, useState } from 'react'

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [taskPost, setTaskPost] = useState('');
  const [newTask, setNewTask] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/task', {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      });
      const task = await response.json();
      setTasks(task);
      
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/task', {
        method: 'POST',
        body: JSON.stringify({
          tasks: taskPost,
        }),
        headers: 'Content-type": "application/json; charset=UTF-8',
        mode: 'cors',
        cache: 'default'
      });
      const task = await response.json();
      setTasks(task);
      
    };
    fetchData();
  }, [taskPost]);

  const handleChange = ({ target }) => {
    setNewTask(target.value);
  }

  const handleSubmit = (event) =>  {
    event.preventDefault();
    setTaskPost(newTask);
  }

  return (
    <div>
      <h1>Lista de Tarefas:</h1>
      <ul>
        {
          tasks && tasks.map(task => <li key={ `${task._id}` }>
              { task.task }
            </li>
          )
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Tarefa:
          <input type="text" value={newTask} onChange={ handleChange } />
        </label>
        <input type="submit" value='Inserir Tarefa' />
      </form>
    </div>
  )
}
