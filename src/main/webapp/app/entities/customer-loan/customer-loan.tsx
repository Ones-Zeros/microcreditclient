import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, InputGroup, Row, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, searchEntities } from './customer-loan.reducer';

export const CustomerLoan = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const customerLoanList = useAppSelector(state => state.customerLoan.entities);
  const loading = useAppSelector(state => state.customerLoan.loading);
  const totalItems = useAppSelector(state => state.customerLoan.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        }),
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        }),
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        }),
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="customer-loan-heading" data-cy="CustomerLoanHeading">
        <Translate contentKey="microcreditclientApp.customerLoan.home.title">Customer Loans</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.customerLoan.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/customer-loan/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.customerLoan.home.createLabel">Create new Customer Loan</Translate>
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  name="search"
                  defaultValue={search}
                  onChange={handleSearch}
                  placeholder={translate('microcreditclientApp.customerLoan.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {customerLoanList && customerLoanList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('loanId')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.loanId">Loan Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('loanId')} />
                </th>
                <th className="hand" onClick={sort('amount')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.amount">Amount</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('amount')} />
                </th>
                <th className="hand" onClick={sort('loanPaymentType')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.loanPaymentType">Loan Payment Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('loanPaymentType')} />
                </th>
                <th className="hand" onClick={sort('loanPeriod')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.loanPeriod">Loan Period</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('loanPeriod')} />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.createdDate">Created Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.lastModifiedDate">Last Modified Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
                </th>
                <th className="hand" onClick={sort('paymentStartDate')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.paymentStartDate">Payment Start Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentStartDate')} />
                </th>
                <th className="hand" onClick={sort('paymentEndDate')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.paymentEndDate">Payment End Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentEndDate')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('insertTs')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.insertTs">Insert Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insertTs')} />
                </th>
                <th className="hand" onClick={sort('modifiedTs')}>
                  <Translate contentKey="microcreditclientApp.customerLoan.modifiedTs">Modified Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedTs')} />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.valuationReport">Valuation Report</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.installmentPlan">Installment Plan</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.createdBy">Created By</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.modifiedBy">Modified By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.customer">Customer</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerLoan.loanTemplate">Loan Template</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerLoanList.map((customerLoan, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/customer-loan/${customerLoan.id}`} color="link" size="sm">
                      {customerLoan.id}
                    </Button>
                  </td>
                  <td>{customerLoan.loanId}</td>
                  <td>{customerLoan.amount}</td>
                  <td>
                    <Translate contentKey={`microcreditclientApp.PaymentType.${customerLoan.loanPaymentType}`} />
                  </td>
                  <td>{customerLoan.loanPeriod}</td>
                  <td>
                    {customerLoan.createdDate ? (
                      <TextFormat type="date" value={customerLoan.createdDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerLoan.lastModifiedDate ? (
                      <TextFormat type="date" value={customerLoan.lastModifiedDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerLoan.paymentStartDate ? (
                      <TextFormat type="date" value={customerLoan.paymentStartDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerLoan.paymentEndDate ? (
                      <TextFormat type="date" value={customerLoan.paymentEndDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`microcreditclientApp.LoanStatus.${customerLoan.status}`} />
                  </td>
                  <td>
                    {customerLoan.insertTs ? <TextFormat type="date" value={customerLoan.insertTs} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {customerLoan.modifiedTs ? <TextFormat type="date" value={customerLoan.modifiedTs} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {customerLoan.valuationReport ? (
                      <Link to={`/vehicle-valuation-report/${customerLoan.valuationReport.id}`}>{customerLoan.valuationReport.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {customerLoan.installmentPlan ? (
                      <Link to={`/installment-plan/${customerLoan.installmentPlan.id}`}>{customerLoan.installmentPlan.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{customerLoan.createdBy ? customerLoan.createdBy.id : ''}</td>
                  <td>{customerLoan.modifiedBy ? customerLoan.modifiedBy.id : ''}</td>
                  <td>
                    {customerLoan.customer ? <Link to={`/customer/${customerLoan.customer.id}`}>{customerLoan.customer.id}</Link> : ''}
                  </td>
                  <td>
                    {customerLoan.loanTemplate ? (
                      <Link to={`/loan-template/${customerLoan.loanTemplate.id}`}>{customerLoan.loanTemplate.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/customer-loan/${customerLoan.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/customer-loan/${customerLoan.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/customer-loan/${customerLoan.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="microcreditclientApp.customerLoan.home.notFound">No Customer Loans found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={customerLoanList && customerLoanList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CustomerLoan;
