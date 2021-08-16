/* eslint-disable no-unused-vars */
import React from 'react';
import { Table as ATable } from 'antd';
import { connect, useDispatch } from 'react-redux';

import '../style/table.scss';
import 'antd/dist/antd.css';
import { setCenterAction } from '../helpers/actionCreators';
import { IRootReducer, ITableProps } from '../helpers/interfaces';

const tableColumns = [
  {
    title: 'Id',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Широта',
    dataIndex: 'lat',
    key: 'lat'
  },
  {
    title: 'Долгота',
    dataIndex: 'lon',
    key: 'lon'
  },
];

const Table: React.FC<ITableProps> = ({ markersData }) => {
  const dispatch = useDispatch();

  return (
    <div className="dataTable">
      <ATable 
        columns={tableColumns}  
        dataSource={markersData}
        pagination={{ pageSize: 10 }} scroll={{ y: 200 }} // УКол-во записей на странице, высота таблицы
        onRow={(record) => {
          return {
            onClick: () => dispatch(setCenterAction(([record.lon, record.lat]))),
          };
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: IRootReducer): ITableProps => { // Берём из стейта то, что нам нужно и отдаём в компонент
  return {
    markersData: state.markers.markersData,
  };
};

export default connect(mapStateToProps)(Table); // соединяем стейт и компонент