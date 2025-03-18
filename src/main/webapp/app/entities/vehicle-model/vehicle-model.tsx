import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import React, { useEffect, useState } from 'react';
import { Translate, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

import FormHeader from 'app/shared/Components/FormHeader';
import PaginationComponent from 'app/shared/Components/PaginationComponent';
import { getEntitiesByBrand } from './vehicle-model.reducer';

export const VehicleModel = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const loading = useAppSelector(state => state.vehicleModel.loading);
  const totalItems = useAppSelector(state => state.vehicleModel.totalItems);
  const vehicleModelList = useAppSelector(state => state.vehicleModel.entities);
  const brandId = useAppSelector(state => state.vehicleBrand.entity?.id);

  const getAllEntities = () => {
    if (brandId) {
      dispatch(
        getEntitiesByBrand({
          id: brandId,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        }),
      );
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState(prevState => ({
        ...prevState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      }));
    }
  }, [pageLocation.search]);

  useEffect(() => {
    if (brandId) {
      getAllEntities();
    }
  }, [paginationState.activePage, paginationState.order, paginationState.sort, brandId]);

  const sort = p => () => {
    setPaginationState(prevState => ({
      ...prevState,
      order: prevState.order === ASC ? DESC : ASC,
      sort: p,
    }));
  };

  const handlePagination = currentPage =>
    setPaginationState(prevState => ({
      ...prevState,
      activePage: currentPage,
    }));

  const handleSyncList = () => {
    getAllEntities();
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
    <div className="padding-top: 20px">
      <h2 id="vehicle-model-heading" data-cy="VehicleModelHeading">
        <FormHeader title="Vehicle Models" />
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="microcreditclientApp.vehicleModel.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/vehicle-model/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="microcreditclientApp.vehicleModel.home.createLabel">Create new Vehicle Model</Translate>
          </Link>
        </div>
      </h2>

      <div className="table-responsive">
        {vehicleModelList && vehicleModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th style={{ display: 'none' }} className="hand" onClick={sort('id')}>
                  <Translate contentKey="microcreditclientApp.vehicleModel.id">Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('model')}>
                  <Translate contentKey="microcreditclientApp.vehicleModel.model">Model</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('model')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="microcreditclientApp.vehicleModel.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleModelList.map((vehicleModel, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td style={{ display: 'none' }}>
                    <Button tag={Link} to={`/vehicle-model/${vehicleModel.id}`} color="link" size="sm">
                      {vehicleModel.id}
                    </Button>
                  </td>
                  <td>{vehicleModel.model}</td>
                  <td>{vehicleModel.description}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/vehicle-model/${vehicleModel.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/vehicle-model/${vehicleModel.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/vehicle-model/${vehicleModel.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="microcreditclientApp.vehicleModel.home.notFound">No Vehicle Models found</Translate>
            </div>
          )
        )}
      </div>
      <PaginationComponent
        totalItems={totalItems}
        itemsPerPage={paginationState.itemsPerPage}
        activePage={paginationState.activePage}
        handlePagination={handlePagination}
        entityList={vehicleModelList}
      />
    </div>
  );
};

export default VehicleModel;
