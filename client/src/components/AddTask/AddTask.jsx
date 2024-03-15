import { useState } from "react";
import axios from "axios";
import "./AddTask.css";

function AddTask({ setAddTaskWindow }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const onSubmit = async (event) => {
    event.preventDefault();
    const user = window.localStorage.getItem("userID");
    const dueDate = new Date(date).toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    try {
      await axios.post("http://localhost:3001/api/v1/tasks", {
        user,
        taskName,
        description,
        dueDate,
        priority,
        status: "Yet to Start",
      });
      setAddTaskWindow(false);
      document.body.style.overflow = 'auto';
    } catch {
      alert("Network Error!!");
    }
  };

  const handleCloseAddTaskWindow = () => {
    setAddTaskWindow(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div id="addTaskWindow">
      <div id="addTaskHeading">
        <h3>&#10095; Add New Task</h3>
        <button id="closeAddTask" onClick={handleCloseAddTaskWindow}>
          &#10094; Back
        </button>
      </div>
      <form id="newTaskForm" onSubmit={onSubmit}>
        <>
          <p className="taskInputLabels">Task Name</p>
          <input
            name="taskName"
            type="text"
            placeholder="eg., Design a Website"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </>
        <>
          <p className="taskInputLabels">Description</p>
          <textarea
            name="description"
            placeholder="Description goes here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </>
        <span id="secondaryInputs">
          <span>
            <p className="taskInputLabels">Set Deadline</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </span>
          <span id="radioInput">
            <p className="taskInputLabels">Set Priority</p>
            <>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                />
                High
              </label>
            </>
          </span>
        </span>
        <button id="addTask" type="submit">
          + Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
