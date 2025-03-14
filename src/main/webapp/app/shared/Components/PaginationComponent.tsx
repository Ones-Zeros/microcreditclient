// src/shared/components/PaginationComponent.tsx
import React from 'react';
import { JhiItemCount, JhiPagination } from 'react-jhipster';

interface PaginationComponentProps {
  totalItems: number;
  itemsPerPage: number;
  activePage: number;
  handlePagination: (currentPage: number) => void;
  entityList: any[];
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  itemsPerPage,
  activePage,
  handlePagination,
  entityList,
}) => {
  if (!totalItems) {
    return null;
  }

  return (
    <div className={entityList && entityList.length > 0 ? '' : 'd-none'}>
      <div className="justify-content-end d-flex">
        <JhiItemCount page={activePage} total={totalItems} itemsPerPage={itemsPerPage} i18nEnabled />
      </div>
      <div className="justify-content-end d-flex">
        <JhiPagination
          activePage={activePage}
          onSelect={handlePagination}
          maxButtons={5}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
