import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import BankBranch from '../bank-branch/bank-branch';

function BankTabbedSection() {
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    setActiveTab(localStorage.getItem('tabIndex') || '1');
  }, []);

  const toggle = tab => {
    localStorage.setItem('tabIndex', tab);
    setActiveTab(tab);
  };

  return (
    <div className="tabbed-section">
      <Nav tabs className="tab-navigation">
        <NavItem>
          <NavLink className={classnames('tab-link', { active: activeTab === '1' })} onClick={() => toggle('1')}>
            Branch
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className={classnames({ active: activeTab === '1' })}>
          {activeTab === '1' ? <BankBranch /> : null}
        </TabPane>
      </TabContent>
    </div>
  );
}

export default BankTabbedSection;
