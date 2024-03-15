import User from './components/User/User.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import TaskManager from './components/TaskManager/TaskManager.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import AppStates from './contexts/AppStates.jsx';
import { useCookies } from 'react-cookie'
import { useState } from 'react';
import './App.css'

function App() {
  const [cookies, _, removeCookies] = useCookies(['access_token']);
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  return (
    <>
      {!cookies.access_token ? <User /> : null}
      <Navbar removeCookies={removeCookies} />
      <AppStates>
        <SearchBar setAddTaskWindow={setAddTaskWindow} />
        <TaskManager addTaskWindow={addTaskWindow} setAddTaskWindow={setAddTaskWindow} />
      </AppStates>
    </>
  )
}

export default App