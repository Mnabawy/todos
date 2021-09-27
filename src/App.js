import { useState } from "react";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import Todo from "./components/Todo";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const newList = tasks.filter(task => task.id !== id)
    setTasks(newList);
  }

  const taskList = tasks.map(todo => (
    <Todo name={todo.name} id={todo.id} key={todo.id} completed={todo.completed} toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ))

  function addTask(name) {
    const newTask = { id: `id-${nanoid()}`, name: name, completed: false }
    setTasks([...tasks, newTask]);
    // console.log(tasks);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${tasks.length} ${tasksNoun} remaining`


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <FilterButton />
      <FilterButton />
      <FilterButton />

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <h2>{headingText}</h2>
        {taskList}
      </ul>
    </div>
  );


}

export default App;
