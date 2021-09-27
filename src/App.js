import { useEffect, useRef, useState } from "react";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import Todo from "./components/Todo";

// getting previous state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);

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

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTasks)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(todo => (
      <Todo name={todo.name} id={todo.id} key={todo.id} completed={todo.completed} toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const filterList = FILTER_NAMES.map(name => (

    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function addTask(name) {
    const newTask = { id: `id-${nanoid()}`, name: name, completed: false }
    setTasks([...tasks, newTask]);
    // console.log(tasks);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${tasks.length} ${tasksNoun} remaining`


  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      {filterList}

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <h2 id="list-heading" tabindex="-1" ref={listHeadingRef}>{headingText}</h2>
        {taskList}
      </ul>
    </div>
  );


}

export default App;
