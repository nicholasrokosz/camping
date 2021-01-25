import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './Components/nav-bar.js';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/todo/:id' component={Detail} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function NotFound(props) {
  return <h1>404</h1>;
}

function Detail(props) {
  return (
    <div>
      <h1>Hey! You are looking for the todo with id {props.match.params.id}</h1>
      <Link to='/'>Home</Link>
    </div>
  );
}

function Home(props) {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then(data => data.json())
      .then(data => setTodos(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: todoText,
      }),
    })
      .then(data => data.json())
      .then(data => {
        setTodos([...todos, data]);
        setTodoText('');
      });
  }
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
