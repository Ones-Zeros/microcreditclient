import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CustomerBankInfo from '../customer-bank-info/customer-bank-info';
import CustomerLoan from '../customer-loan/customer-loan';

const CustomerTabSection = ({ mode }) => {
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    setActiveTab('1');
    localStorage.setItem('tabIndex', '1');
  }, [mode]);

  const toggle = tab => {
    if (activeTab !== tab) {
      localStorage.setItem('tabIndex', tab);
      setActiveTab(tab);
    }
  };

  return (
    <div className="tabbed-section">
      <Nav tabs className="tab-navigation">
        <NavItem>
          <NavLink className={classnames('tab-link', { active: activeTab === '1' })} onClick={() => toggle('1')}>
            Bank Account Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={classnames('tab-link', { active: activeTab === '2' })} onClick={() => toggle('2')}>
            Customer Loans
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CustomerBankInfo />
        </TabPane>
        <TabPane tabId="2">
          <CustomerLoan />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default CustomerTabSection;
