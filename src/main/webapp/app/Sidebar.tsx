import './sidebar.scss';
import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IHeaderProps } from './shared/layout/header/header';
import EntitiesMenu from './entities/menu';

const Sidebar = (props: IHeaderProps) => {
  const [isLoansOpen, setIsLoansOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isGuarantorOpen, setIsGuarantorOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleLoans = () => setIsLoansOpen(!isLoansOpen);
  const toggleCustomers = () => setIsCustomersOpen(!isCustomersOpen);
  const toggleBank = () => setIsBankOpen(!isBankOpen);
  const toggleCustomer = () => setIsCustomerOpen(!isCustomerOpen);
  const toggleGuarantor = () => setIsGuarantorOpen(!isGuarantorOpen);
  const toggleVehicle = () => setIsVehicleOpen(!isVehicleOpen);
  const toggleReports = () => setIsReportsOpen(!isReportsOpen);
  const toggleAdmin = () => setIsAdminOpen(!isAdminOpen);

  return (
    <div className="sidebar">
      <Nav vertical>
        <NavItem>
          <NavLink tag={Link} to="">
            Home
          </NavLink>
        </NavItem>
        <NavLink tag={Link} to="/customer">
          Customer
        </NavLink>
        <NavLink tag={Link} to="/customer-loan">
          Loans
        </NavLink>
        <NavItem>
          <NavLink tag={Link} to="/reports">
            Reports
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={toggleLoans}>
            Basic Data
          </NavLink>
          <Collapse isOpen={isLoansOpen}>
            <Nav className="ml-3" vertical>
              <NavItem>
                <NavLink tag={Link} to="/vehicle-brand">
                  Vehicle Brand
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/bank">
                  Bank
                </NavLink>
                <NavLink tag={Link} to="/guarantor">
                  Guarantor
                </NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink tag={Link} to="/bank-branch">
                  Branches
                </NavLink> */}
              </NavItem>
            </Nav>
          </Collapse>
        </NavItem>
        {props.isAdmin && (
          <NavItem>
            <NavLink href="#" onClick={toggleAdmin}>
              Administration
            </NavLink>
            <Collapse isOpen={isAdminOpen}>
              <Nav className="ml-3" vertical>
                <NavItem>
                  <NavLink tag={Link} to="/admin/user-management">
                    User Management
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/metrics">
                    Metrics
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/health">
                    Health
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/configuration">
                    Configuration
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/logs">
                    Logs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/admin/docs">
                    API
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </NavItem>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
