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

import { getEntities, searchEntities } from './collector-collection-route.reducer';

export const CollectorCollectionRoute = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const collectorCollectionRouteList = useAppSelector(state => state.collectorCollectionRoute.entities);
  const loading = useAppSelector(state => state.collectorCollectionRoute.loading);
  const totalItems = useAppSelector(state => state.collectorCollectionRoute.totalItems);

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
      <h2 id="collector-collection-route-heading" data-cy="CollectorCollectionRouteHeading">
        <Translate contentKey="microcreditclientApp.collectorCollectionRoute.home.title">Collector Collection Routes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/collector-collection-route/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.collectorCollectionRoute.home.createLabel">
              Create new Collector Collection Route
            </Translate>
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
                  placeholder={translate('microcreditclientApp.collectorCollectionRoute.home.search')}
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
        {collectorCollectionRouteList && collectorCollectionRouteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.id">Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('routeId')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.routeId">Route Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('routeId')} />
                </th>
                <th className="hand" onClick={sort('collectorId')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.collectorId">Collector Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('collectorId')} />
                </th>
                <th className="hand" onClick={sort('startDate')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.startDate">Start Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('startDate')} />
                </th>
                <th className="hand" onClick={sort('endDate')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.endDate">End Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('endDate')} />
                </th>
                <th className="hand" onClick={sort('insertTs')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.insertTs">Insert Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insertTs')} />
                </th>
                <th className="hand" onClick={sort('modifiedTs')}>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.modifiedTs">Modified Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedTs')} />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.user">User</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.collectorRoute">Collector Route</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.collectorCollectionRoute.weeklyCollection">Weekly Collection</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {collectorCollectionRouteList.map((collectorCollectionRoute, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/collector-collection-route/${collectorCollectionRoute.id}`} color="link" size="sm">
                      {collectorCollectionRoute.id}
                    </Button>
                  </td>
                  <td>{collectorCollectionRoute.routeId}</td>
                  <td>{collectorCollectionRoute.collectorId}</td>
                  <td>
                    {collectorCollectionRoute.startDate ? (
                      <TextFormat type="date" value={collectorCollectionRoute.startDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {collectorCollectionRoute.endDate ? (
                      <TextFormat type="date" value={collectorCollectionRoute.endDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {collectorCollectionRoute.insertTs ? (
                      <TextFormat type="date" value={collectorCollectionRoute.insertTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {collectorCollectionRoute.modifiedTs ? (
                      <TextFormat type="date" value={collectorCollectionRoute.modifiedTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{collectorCollectionRoute.user ? collectorCollectionRoute.user.id : ''}</td>
                  <td>
                    {collectorCollectionRoute.collectorRoute ? (
                      <Link to={`/collector-route/${collectorCollectionRoute.collectorRoute.id}`}>
                        {collectorCollectionRoute.collectorRoute.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {collectorCollectionRoute.weeklyCollection ? (
                      <Link to={`/weekly-collection/${collectorCollectionRoute.weeklyCollection.id}`}>
                        {collectorCollectionRoute.weeklyCollection.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/collector-collection-route/${collectorCollectionRoute.id}`}
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
                        to={`/collector-collection-route/${collectorCollectionRoute.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/collector-collection-route/${collectorCollectionRoute.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="microcreditclientApp.collectorCollectionRoute.home.notFound">
                No Collector Collection Routes found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={collectorCollectionRouteList && collectorCollectionRouteList.length > 0 ? '' : 'd-none'}>
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

export default CollectorCollectionRoute;
