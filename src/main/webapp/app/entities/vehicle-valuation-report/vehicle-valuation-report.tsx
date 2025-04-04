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

import { getEntities, searchEntities } from './vehicle-valuation-report.reducer';

export const VehicleValuationReport = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const vehicleValuationReportList = useAppSelector(state => state.vehicleValuationReport.entities);
  const loading = useAppSelector(state => state.vehicleValuationReport.loading);
  const totalItems = useAppSelector(state => state.vehicleValuationReport.totalItems);

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
      <h2 id="vehicle-valuation-report-heading" data-cy="VehicleValuationReportHeading">
        <Translate contentKey="microcreditclientApp.vehicleValuationReport.home.title">Vehicle Valuation Reports</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.vehicleValuationReport.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/vehicle-valuation-report/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.vehicleValuationReport.home.createLabel">
              Create new Vehicle Valuation Report
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
                  placeholder={translate('microcreditclientApp.vehicleValuationReport.home.search')}
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
        {vehicleValuationReportList && vehicleValuationReportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.id">Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('vehicleNo')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.vehicleNo">Vehicle No</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('vehicleNo')} />
                </th>
                <th className="hand" onClick={sort('chassisNumber')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.chassisNumber">Chassis Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('chassisNumber')} />
                </th>
                <th className="hand" onClick={sort('engineId')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.engineId">Engine Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('engineId')} />
                </th>
                <th className="hand" onClick={sort('engineCapacity')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.engineCapacity">Engine Capacity</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('engineCapacity')} />
                </th>
                <th className="hand" onClick={sort('imgUrl1')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl1">Img Url 1</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl1')} />
                </th>
                <th className="hand" onClick={sort('imgUrl2')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl2">Img Url 2</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl2')} />
                </th>
                <th className="hand" onClick={sort('imgUrl3')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl3">Img Url 3</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl3')} />
                </th>
                <th className="hand" onClick={sort('imgUrl4')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl4">Img Url 4</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl4')} />
                </th>
                <th className="hand" onClick={sort('imgUrl5')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl5">Img Url 5</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl5')} />
                </th>
                <th className="hand" onClick={sort('imgUrl6')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.imgUrl6">Img Url 6</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imgUrl6')} />
                </th>
                <th className="hand" onClick={sort('insertTs')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.insertTs">Insert Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insertTs')} />
                </th>
                <th className="hand" onClick={sort('modifiedTs')}>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.modifiedTs">Modified Ts</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedTs')} />
                </th>
                <th>
                  <Translate contentKey="microcreditclientApp.vehicleValuationReport.vehicleModel">Vehicle Model</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleValuationReportList.map((vehicleValuationReport, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/vehicle-valuation-report/${vehicleValuationReport.id}`} color="link" size="sm">
                      {vehicleValuationReport.id}
                    </Button>
                  </td>
                  <td>{vehicleValuationReport.vehicleNo}</td>
                  <td>{vehicleValuationReport.chassisNumber}</td>
                  <td>{vehicleValuationReport.engineId}</td>
                  <td>{vehicleValuationReport.engineCapacity}</td>
                  <td>{vehicleValuationReport.imgUrl1}</td>
                  <td>{vehicleValuationReport.imgUrl2}</td>
                  <td>{vehicleValuationReport.imgUrl3}</td>
                  <td>{vehicleValuationReport.imgUrl4}</td>
                  <td>{vehicleValuationReport.imgUrl5}</td>
                  <td>{vehicleValuationReport.imgUrl6}</td>
                  <td>
                    {vehicleValuationReport.insertTs ? (
                      <TextFormat type="date" value={vehicleValuationReport.insertTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {vehicleValuationReport.modifiedTs ? (
                      <TextFormat type="date" value={vehicleValuationReport.modifiedTs} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {vehicleValuationReport.vehicleModel ? (
                      <Link to={`/vehicle-model/${vehicleValuationReport.vehicleModel.id}`}>{vehicleValuationReport.vehicleModel.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/vehicle-valuation-report/${vehicleValuationReport.id}`}
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
                        to={`/vehicle-valuation-report/${vehicleValuationReport.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/vehicle-valuation-report/${vehicleValuationReport.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="microcreditclientApp.vehicleValuationReport.home.notFound">
                No Vehicle Valuation Reports found
              </Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={vehicleValuationReportList && vehicleValuationReportList.length > 0 ? '' : 'd-none'}>
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

export default VehicleValuationReport;
