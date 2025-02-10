import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, InputGroup, Row, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, searchEntities } from './weekly-collection-item.reducer';

export const WeeklyCollectionItem = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const weeklyCollectionItemList = useAppSelector(state => state.weeklyCollectionItem.entities);
  const loading = useAppSelector(state => state.weeklyCollectionItem.loading);
  const totalItems = useAppSelector(state => state.weeklyCollectionItem.totalItems);

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
      <h2 id="weekly-collection-item-heading" data-cy="WeeklyCollectionItemHeading">
        <Translate contentKey="microcreditclientApp.weeklyCollectionItem.home.title">Weekly Collection Items</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/weekly-collection-item/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.weeklyCollectionItem.home.createLabel">Create new Weekly Collection Item</Translate>
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
                  placeholder={translate('microcreditclientApp.weeklyCollectionItem.home.search')}
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
        {weeklyCollectionItemList && weeklyCollectionItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.id">Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('amountToBePaid')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.amountToBePaid">Amount To Be Paid</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('amountToBePaid')} />
                </th>
                <th className="hand" onClick={sort('amountPaid')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.amountPaid">Amount Paid</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('amountPaid')} />
                </th>
                <th className="hand" onClick={sort('note')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.note">Note</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('note')} />
                </th>
                <th className="hand" onClick={sort('insertTs')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.insertTs">Insert Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insertTs')} />
                </th>
                <th className="hand" onClick={sort('modifiedTs')}>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.modifiedTs">Modified Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedTs')} />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.installmentPlanItem">Installment Plan Item</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.weeklyCollection">Weekly Collection</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.createdBy">Created By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.weeklyCollectionItem.updatedBy">Updated By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {weeklyCollectionItemList.map((weeklyCollectionItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/weekly-collection-item/${weeklyCollectionItem.id}`} color="link" size="sm">
                      {weeklyCollectionItem.id}
                    </Button>
                  </td>
                  <td>{weeklyCollectionItem.amountToBePaid}</td>
                  <td>{weeklyCollectionItem.amountPaid}</td>
                  <td>{weeklyCollectionItem.note}</td>
                  <td>
                    {weeklyCollectionItem.insertTs ? (
                      <TextFormat type="date" value={weeklyCollectionItem.insertTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {weeklyCollectionItem.modifiedTs ? (
                      <TextFormat type="date" value={weeklyCollectionItem.modifiedTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {weeklyCollectionItem.installmentPlanItem ? (
                      <Link to={`/installment-plan-item/${weeklyCollectionItem.installmentPlanItem.id}`}>
                        {weeklyCollectionItem.installmentPlanItem.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {weeklyCollectionItem.weeklyCollection ? (
                      <Link to={`/weekly-collection/${weeklyCollectionItem.weeklyCollection.id}`}>
                        {weeklyCollectionItem.weeklyCollection.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{weeklyCollectionItem.createdBy ? weeklyCollectionItem.createdBy.id : ''}</td>
                  <td>{weeklyCollectionItem.updatedBy ? weeklyCollectionItem.updatedBy.id : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/weekly-collection-item/${weeklyCollectionItem.id}`}
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
                        to={`/weekly-collection-item/${weeklyCollectionItem.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/weekly-collection-item/${weeklyCollectionItem.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="microcreditclientApp.weeklyCollectionItem.home.notFound">No Weekly Collection Items found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={weeklyCollectionItemList && weeklyCollectionItemList.length > 0 ? '' : 'd-none'}>
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

export default WeeklyCollectionItem;
