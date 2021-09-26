import AddTask from "./components/AddTask";
import FilterBtns from "./components/FilterBtns";
import RemainingTasks from "./components/RemainingTasks";
import Tasks from "./components/Tasks";


function App() {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <AddTask />
      <FilterBtns />
      <RemainingTasks />
      <Tasks />
    </div>
  );
}

export default App;
