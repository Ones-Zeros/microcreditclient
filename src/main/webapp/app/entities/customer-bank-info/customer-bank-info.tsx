import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import React, { useEffect, useState } from 'react';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState, translate } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, InputGroup, Row, Table } from 'reactstrap';

import { getEntitiesByCustomer, searchEntities } from './customer-bank-info.reducer';

export const CustomerBankInfo = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const customerId = useAppSelector(state => state.customer.entity.id);
  const customerBankInfoList = useAppSelector(state => state.customerBankInfo.entities);
  const loading = useAppSelector(state => state.customerBankInfo.loading);
  const totalItems = useAppSelector(state => state.customerBankInfo.totalItems);

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
        getEntitiesByCustomer({
          id: customerId,
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
    dispatch(
      getEntitiesByCustomer({
        id: 0,
        page: 0,
        size: 0,
        sort: '',
      }),
    );
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
      <h2 id="customer-bank-info-heading" data-cy="CustomerBankInfoHeading">
        <Translate contentKey="microcreditclientApp.customerBankInfo.home.title">Customer Bank Infos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.customerBankInfo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/customer-bank-info/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.customerBankInfo.home.createLabel">Create new Customer Bank Info</Translate>
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
                  placeholder={translate('microcreditclientApp.customerBankInfo.home.search')}
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
        {customerBankInfoList && customerBankInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('accountNumber')}>
                  <Translate contentKey="microcreditclientApp.customerBankInfo.accountNumber">Account Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('accountNumber')} />
                </th>
                <th className="hand" onClick={sort('insertTs')}>
                  <Translate contentKey="microcreditclientApp.customerBankInfo.insertTs">Insert Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insertTs')} />
                </th>
                <th className="hand" onClick={sort('modifiedTs')}>
                  <Translate contentKey="microcreditclientApp.customerBankInfo.modifiedTs">Modified Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedTs')} />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerBankInfo.bankBranch">Bank Branch</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.customerBankInfo.customer">Customer</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerBankInfoList.map((customerBankInfo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{customerBankInfo.accountNumber}</td>
                  <td>
                    {customerBankInfo.insertTs ? (
                      <TextFormat type="date" value={customerBankInfo.insertTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerBankInfo.modifiedTs ? (
                      <TextFormat type="date" value={customerBankInfo.modifiedTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {customerBankInfo.bankBranch ? (
                      <Link to={`/bank-branch/${customerBankInfo.bankBranch.id}`}>{customerBankInfo.bankBranch.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {customerBankInfo.customer ? (
                      <Link to={`/customer/${customerBankInfo.customer.id}`}>{customerBankInfo.customer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/customer-bank-info/${customerBankInfo.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/customer-bank-info/${customerBankInfo.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/customer-bank-info/${customerBankInfo.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="microcreditclientApp.customerBankInfo.home.notFound">No Customer Bank Infos found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={customerBankInfoList && customerBankInfoList.length > 0 ? '' : 'd-none'}>
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

export default CustomerBankInfo;
