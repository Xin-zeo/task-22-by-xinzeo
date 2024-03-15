import { useContext, useState } from "react";
import AppContext from "../../contexts/AppContext";
import Task from "../Task/Task";
import "./SearchBar.css";

function SearchBar({ setAddTaskWindow }) {
  const [searchVal, setSearchVal] = useState("");
  const { columnOne, columnTwo, columnThree } = useContext(AppContext);

  const handleSearchVal = (e) => {
    const inputVal = e.target.value;
    setSearchVal(inputVal);
  };

  const searchColumnOne = columnOne.filter((res) =>
    res.taskName.toLowerCase().includes(searchVal.toLowerCase())
  );
  const searchColumnTwo = columnTwo.filter((res) =>
    res.taskName.toLowerCase().includes(searchVal.toLowerCase())
  );
  const searchColumnThree = columnThree.filter((res) =>
    res.taskName.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleAddTaskWindow = () => {
    setAddTaskWindow(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div id="searchTaskContainer">
        <input
          name="searchBar"
          type="search"
          placeholder="Search for tasks"
          onChange={handleSearchVal}
        />
        <button onClick={handleAddTaskWindow}>+ Add New Task</button>
      </div>
      {searchVal !== "" && (
        <div className="search-results">
          <div>
            <p className="search-result-heading">Yet To Start &#10239;</p>
            {searchColumnOne.length !== 0 ? (
              <Task taskList={searchColumnOne} />
            ) : (
              <p className="no-search-result">No Result</p>
            )}
          </div>
          <div>
            <p className="search-result-heading">In Progress &#10239;</p>
            {searchColumnTwo.length !== 0 ? (
              <Task taskList={searchColumnTwo} />
            ) : (
              <p className="no-search-result">No Result</p>
            )}
          </div>
          <div>
            <p className="search-result-heading">Completed &#10239;</p>
            {searchColumnThree.length !== 0 ? (
              <Task taskList={searchColumnThree} />
            ) : (
              <p className="no-search-result">No Result</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
