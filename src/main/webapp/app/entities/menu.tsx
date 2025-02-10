import MenuItem from 'app/shared/layout/menus/menu-item';
import React from 'react';
import { Translate } from 'react-jhipster';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/bank">
        <Translate contentKey="global.menu.entities.bank" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/bank-branch">
        <Translate contentKey="global.menu.entities.bankBranch" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer">
        <Translate contentKey="global.menu.entities.customer" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/loan-template">
        <Translate contentKey="global.menu.entities.loanTemplate" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer-loan">
        <Translate contentKey="global.menu.entities.customerLoan" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/guarantor">
        <Translate contentKey="global.menu.entities.guarantor" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/installment-plan">
        <Translate contentKey="global.menu.entities.installmentPlan" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/loan-mortgage">
        <Translate contentKey="global.menu.entities.loanMortgage" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment-plan">
        <Translate contentKey="global.menu.entities.paymentPlan" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/payment-plan-item">
        <Translate contentKey="global.menu.entities.paymentPlanItem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/weekly-collection">
        <Translate contentKey="global.menu.entities.weeklyCollection" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/weekly-collection-item">
        <Translate contentKey="global.menu.entities.weeklyCollectionItem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/collector-route">
        <Translate contentKey="global.menu.entities.collectorRoute" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/collector-collection-route">
        <Translate contentKey="global.menu.entities.collectorCollectionRoute" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/vehicle-valuation-report">
        <Translate contentKey="global.menu.entities.vehicleValuationReport" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/vehicle-model">
        <Translate contentKey="global.menu.entities.vehicleModel" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/vehicle-brand">
        <Translate contentKey="global.menu.entities.vehicleBrand" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/customer-bank-info">
        <Translate contentKey="global.menu.entities.customerBankInfo" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/installment-plan-item">
        <Translate contentKey="global.menu.entities.installmentPlanItem" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
