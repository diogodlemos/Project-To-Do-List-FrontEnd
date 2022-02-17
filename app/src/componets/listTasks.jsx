import React, { useEffect, useState } from 'react';
import '../styles/listTasks.css';

export default function ListTasks() {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
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
    fetch('http://localhost:3001/task')
      .then((response) => response.json())
      .then((newsTasks) => setTasks(newsTasks));
      setNewTask('');
  }, [reload]);

  const handleChange = ({ target }) => {
    setNewTask(target.value);
  }

  const handleSubmit = async (event) =>  {
    event.preventDefault();
    await fetch('http://localhost:3001/task', {
        method: 'POST',
        body: JSON.stringify({
          task: newTask,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        mode: 'cors',
        cache: 'default'
      });
      setReload((prevState) => !prevState);
    };

  return (
    <div id='container-task'>
      <div id='task-list'>
        <h1>Lista de Tarefas:</h1>
        <ul>
          {
            (tasks) && tasks.map(task => <li key={ `${task._id}` }>
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
    </div>
  )
}
