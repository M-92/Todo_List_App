import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [task, setTask] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { text: task, completed: false }]);
      setTask('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return false;
  });

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsSignup(false);
    }
  };

  const handleSignup = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setIsSignup(false);
    }
  };

  const renderLoginForm = () => (
    <div>
      <h2 className="login">{isSignup ? 'SIGNUP' : 'LOGIN'}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={isSignup ? handleSignup : handleLogin} className="loginbutton" >
        {isSignup ? 'SIGNUP' : 'LOGIN'}
      </button>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Todo List App</h1>
        {!isLoggedIn && (
          <div>
            <button onClick={() => setIsSignup(false)} className="headerButton">Login</button>
            <button onClick={() => setIsSignup(true)} className="headerButton">Signup</button>
          </div>
        )}
      </header>

      {isLoggedIn ? (
        <div>
          <div className="filterButtons">
            <button onClick={() => setFilter('all')} className="filterButton">All</button>
            <button onClick={() => setFilter('active')} className="filterButton">Active</button>
            <button onClick={() => setFilter('completed')} className="filterButton">Completed</button>
          </div>

          <div className="todoInput">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task"
              className="inputtext"
            />
            <button onClick={handleAddTodo} className="addButton">Add</button>
          </div>

          <ul className="todoList">
            {filteredTodos.map((todo, index) => (
              <li key={index} className={`todoItem ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="checkbox"
                />
                {todo.text}
                <button onClick={() => handleDeleteTodo(index)} className="deleteButton">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        renderLoginForm()
      )}

      <footer className="footer">
        <a href="mailto:your-email@example.com" className="footerIcon">Email</a>
        <a href="https://github.com/your-github-profile" className="footerIcon">GitHub</a>
      </footer>
    </div>
  );
}

export default App;
