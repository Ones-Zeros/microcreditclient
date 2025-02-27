import './sidebar.scss';
import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IHeaderProps } from './shared/layout/header/header';
import EntitiesMenu from './entities/menu';

const Sidebar = (props: IHeaderProps) => {
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);

  const toggleLoans = () => setIsLoansOpen(!isLoansOpen);
  const toggleCustomers = () => setIsCustomersOpen(!isCustomersOpen);

  return (
    <div className="sidebar">
      <Nav vertical>
        <NavItem>
          <NavLink tag={Link} to="">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={toggleLoans}>
            Bank Info
          </NavLink>
          <Collapse isOpen={isLoansOpen}>
            <Nav className="ml-3" vertical>
              <NavItem>
                <NavLink tag={Link} to="/bank">
                  Bank
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/bank-branch">
                  Branches
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </NavItem>
        <NavLink tag={Link} to="/customer">
          Customer
        </NavLink>
        <NavLink tag={Link} to="/customer-loan">
          Loans
        </NavLink>
        <NavLink tag={Link} to="/guarantor">
          Guarantor
        </NavLink>
        <NavItem>
          <NavLink href="#" onClick={toggleCustomers}>
            Vehicle
          </NavLink>
          <Collapse isOpen={isCustomersOpen}>
            <Nav className="ml-3" vertical>
              <NavItem>
                <NavLink tag={Link} to="/vehicle-brand">
                  Brand
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/vehicle-model">
                  Model
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/reports">
            Reports
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
