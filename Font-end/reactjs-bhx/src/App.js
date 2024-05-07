import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

import Header from './components/header';
import TableUsers from './components/tableUsers';



function App() {
  return (
    <div className="app-container">
      <Header></Header>
      <Container>
        <TableUsers></TableUsers>

      </Container>
    </div>
  );
}

export default App;
