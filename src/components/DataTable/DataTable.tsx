import React, { FunctionComponent } from 'react'
import MaterialTable, { Query } from 'material-table'

export interface IDataTableQuery extends Query<any> {}

interface IDataTableProps {
  options?: object
  data: any
  columns: any
  detailPanel?: any
  actions?: any
  components?: any
  ref?: any
  onRowClick?: any
  tableRef?: any
  title?: any
  icons?: any
}

const DataTable: FunctionComponent<IDataTableProps> = props => <MaterialTable {...props} />
export default DataTable
