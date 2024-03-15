import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext";

const AppStates = (props) => {
  const [allTasks, setAllTasks] = useState([]);

  const columnOne = allTasks.filter((val) => val.status === "Yet to Start");
  const columnTwo = allTasks.filter((val) => val.status === "In Progress");
  const columnThree = allTasks.filter((val) => val.status === "Completed");

  useEffect(() => {
    const getAllTasks = async () => {
      const userId = window.localStorage.getItem("userID");
      try {
        const response = await axios.get(
          `https://task-22-by-xinzeo.onrender.com/api/v1/tasks/${userId}`
        );
        setAllTasks(response.data);
      } catch {
        alert("Network Error!!");
      }
    };
    getAllTasks();
  }, [allTasks]);

  return (
    <AppContext.Provider
      value={{
        columnOne,
        columnTwo,
        columnThree,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppStates;
