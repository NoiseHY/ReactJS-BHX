import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BsHouse, BsFillGridFill, BsPeopleFill, BsBoxArrowUpRight, BsSearch } from 'react-icons/bs';


function Header() {
  return (
    <>
      <div className='d-flex justify-content-between'>
        <Container>
          <Navbar expand="lg" className="d-flex justify-content-between">
            <Navbar.Brand href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">

              Bách Hóa Xanh
            </Navbar.Brand>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0">
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                <button className="btn " type="button" onClick={() => console.log("Search button clicked!")}>
                  <BsSearch />
                </button>
              </div>
            </form>


            <Nav className="col-12 col-lg-auto mb-2 justify-content-center mb-md-0">
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
              <NavDropdown title={<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />} id="dropdownUser1" className="text-end">
                <NavDropdown.Item href="#">
                  <BsFillGridFill className="me-2" />
                  New project...
                </NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar>
        </Container>

      </div>
    </>
  );
}

export default Header;

