import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CustomerBankInfo from '../customer-bank-info/customer-bank-info';

const CustomerTabSection = ({ mode }) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(localStorage.getItem('tabIndex') ? localStorage.getItem('tabIndex') : '1');
  }, []);

  const toggle = (tab: string) => {
    localStorage.setItem('tabIndex', tab);
    setActiveTab(tab);
  };

  return (
    <div className="tabbed-section">
      <Nav tabs className="tab-navigation">
        <NavItem>
          <NavLink className={classnames('tab-link', { active: activeTab === '1' })} onClick={() => toggle('1')}>
            Bank Account Details
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className={classnames({ active: activeTab === '1' })}>
          {activeTab === '1' ? <CustomerBankInfo /> : null}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default CustomerTabSection;
