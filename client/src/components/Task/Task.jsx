import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import UpdateTask from "../UpdateTask/UpdateTask";
import "./Task.css";

export function ColumnOneTasks() {
  const { columnOne } = useContext(AppContext);
  return <Task taskList={columnOne} />;
}

export function ColumnTwoTasks() {
  const { columnTwo } = useContext(AppContext);
  return <Task taskList={columnTwo} />;
}

export function ColumnThreeTasks() {
  const { columnThree } = useContext(AppContext);
  return <Task taskList={columnThree} />;
}

const Task = ({ taskList }) => {
  const [updateTaskOptions, setUpdateTaskOptions] = useState(
    taskList.reduce((acc, curr) => {
      acc[curr._id] = false;
      return acc;
    }, {})
  );

  const showUpdateTaskOptions = (res) => {
    setUpdateTaskOptions({ [res._id]: !updateTaskOptions[res._id] });
  };

  return (
    <div className="tasks-container">
      {taskList.map((res) => (
        <div key={res._id} className="task-container">
          <div className="priority-bar">
            <p>&#128978; {res.priority}</p>
            <button
              onClick={() => showUpdateTaskOptions(res)}
              className="task-option-btn"
            >
              {updateTaskOptions[res._id]
                ? String.fromCharCode(10005)
                : String.fromCharCode(8942)}
            </button>
            {updateTaskOptions[res._id] && (
              <UpdateTask
                id={res._id}
                taskName={res.taskName}
                description={res.description}
                priority={res.priority}
                status={res.status}
              />
            )}
          </div>
          <h3>{res.taskName}:</h3>
          <p>&#10239; {res.description}</p>
          <h5>{res.dueDate}</h5>
        </div>
      ))}
    </div>
  );
};

export default Task;
