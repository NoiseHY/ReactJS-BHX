import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsHouse, BsFillGridFill, BsPeopleFill, BsBoxArrowUpRight, BsSearch } from 'react-icons/bs';

function Header() {
  return (
    <>
      <Container>
        <Navbar expand="lg" className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Navbar.Brand href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <BsHouse className="me-2" size={32} />
            Bootstrap
          </Navbar.Brand>

          <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <Nav.Link href="#" className="nav-link px-2 link-secondary">
              <BsFillGridFill className="me-2" />
              Overview
            </Nav.Link>
            <Nav.Link href="#" className="nav-link px-2 link-dark">
              <BsBoxArrowUpRight className="me-2" />
              Inventory
            </Nav.Link>
            <Nav.Link href="#" className="nav-link px-2 link-dark">
              <BsPeopleFill className="me-2" />
              Customers
            </Nav.Link>
            <Nav.Link href="#" className="nav-link px-2 link-dark">
              <BsFillGridFill className="me-2" />
              Products
            </Nav.Link>
          </Nav>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <div className="input-group">
              <span className="input-group-text"><BsSearch /></span>
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
            </div>
          </form>

          <div className="dropdown text-end">
            <NavDropdown title={<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>} id="dropdownUser1">
              <NavDropdown.Item href="#">
                <BsFillGridFill className="me-2" />
                New project...
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
