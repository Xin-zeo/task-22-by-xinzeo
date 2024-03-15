import { ColumnOneTasks, ColumnTwoTasks, ColumnThreeTasks } from "../Task/Task";
import { useContext } from "react";
import AddTask from "../AddTask/AddTask";
import AppContext from "../../contexts/AppContext";
import "./TaskManager.css";

function TaskManager({ addTaskWindow, setAddTaskWindow }) {
  const { columnOne, columnTwo, columnThree } = useContext(AppContext);

  return (
    <div id="taskManagement">
      {addTaskWindow && <AddTask setAddTaskWindow={setAddTaskWindow} />}
      <div className="columnOne">
        <div className="columnHeading">
          <h3>Yet To Start</h3>
          <p id="taskCountBlue">{columnOne.length}</p>
        </div>
        <div className="column-tasks">
          <ColumnOneTasks />
        </div>
      </div>
      <div className="columnTwo">
        <div className="columnHeading">
          <h3>In Progress</h3>
          <p id="taskCountOrange">{columnTwo.length}</p>
        </div>
        <div className="column-tasks">
          <ColumnTwoTasks />
        </div>
      </div>
      <div className="columnThree">
        <div className="columnHeading">
          <h3>Completed</h3>
          <p id="taskCountGreen">{columnThree.length}</p>
        </div>
        <div className="column-tasks">
          <ColumnThreeTasks />
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
