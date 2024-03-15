import { useState } from "react";
import axios from "axios";
import "./UpdateTask.css";

function UpdateTask({ id, taskName, description, priority, status }) {
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newDescription, setNewDescription] = useState(description);
  const [newPriority, setNewPriority] = useState(priority);
  const [newStatus, setNewStatus] = useState(status);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/v1/tasks/${id}`, {
        taskName: newTaskName,
        description: newDescription,
        priority: newPriority,
        status: newStatus,
      });
    } catch {
      alert("Network Error!!");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/tasks/${id}`);
    } catch {
      alert("Network Error!!");
    }
  };

  return (
    <div className="task-option-container">
      <span>
        <span>
          <button
            onClick={() => setShowEditOptions(!showEditOptions)}
            className="edit-option-btns"
          >
            {!showEditOptions ? "Update" : "Cancel"}
          </button>
          {showEditOptions && (
            <button className="update-btn" onClick={handleUpdate}>
              Submit
            </button>
          )}
        </span>
        {showEditOptions && (
          <div className="edit-options">
            <label className="edit-options-label">
              TASKNAME
              <input
                name="taskName"
                type="text"
                placeholder="eg., Design a Website"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
              />
            </label>
            <label className="edit-options-label">
              DESCRIPTION
              <textarea
                name="description"
                placeholder="Description goes here..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                required
              />
            </label>
            <span>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={newPriority === "Low"}
                  onChange={() => setNewPriority("Low")}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={newPriority === "Medium"}
                  onChange={() => setNewPriority("Medium")}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={newPriority === "High"}
                  onChange={() => setNewPriority("High")}
                />
                High
              </label>
            </span>
            <div>
              <button
                onClick={() => setNewStatus("Yet to Start")}
                className={
                  newStatus === "Yet to Start"
                    ? "selected-status"
                    : "status-options"
                }
              >
                Yet to Start
              </button>
              <button
                onClick={() => setNewStatus("In Progress")}
                className={
                  newStatus === "In Progress"
                    ? "selected-status"
                    : "status-options"
                }
              >
                In Progress
              </button>
              <button
                onClick={() => setNewStatus("Completed")}
                className={
                  newStatus === "Completed"
                    ? "selected-status"
                    : "status-options"
                }
              >
                Completed
              </button>
            </div>
          </div>
        )}
      </span>
      <button onClick={handleDelete} className="edit-option-btns">
        Delete
      </button>
    </div>
  );
}

export default UpdateTask;
