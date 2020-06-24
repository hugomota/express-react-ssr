import React, { FunctionComponent, MouseEvent, createRef, forwardRef, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { AxiosResponse } from 'axios'
import Head from 'next/head'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import { Grid } from '@material-ui/core'
import DataTable, { IDataTableQuery } from '../components/DataTable'
import Badge from '../components/Badge'
import PageTitle from '../components/PageTitle'
import AccessRequestApproveModal from '../wrappers/AccessRequestApproveModal'
import AccessRequestDetailsModal from '../wrappers/AccessRequestDetailsModal'
import AccessRequestDeclineModal from '../wrappers/AccessRequestDeclineModal'
import { useAccessRequestsContext } from '../context/AccessRequestsContext'
import { TABLE_OPTIONS, TABLE_COLUMNS, COLORS_BY_STATUS, STATUS } from '../constants/accessRequests'
import { apiService } from '../server/services'
import { IAccessRequest } from '../types'

const AccessRequests: FunctionComponent = () => {
  const { addToast } = useToasts()

  const {
    setSelectedAccessRequest,
    toggleIsDetailsModalOpen,
    toggleIsApprovalModalOpen,
    toggleIsDeclineModalOpen,
  } = useAccessRequestsContext()

  const dataTableRef = createRef<any>()

  const [columns] = useState([
    ...TABLE_COLUMNS,
    {
      width: '140px',
      title: 'Status',
      field: 'status',
      lookup: { pending: 'pending', approved: 'approved', declined: 'declined' },
      defaultFilter: ['pending'],
      render: ({ status }: IAccessRequest) => <Badge color={COLORS_BY_STATUS[status.toLowerCase()]}>{status}</Badge>,
    },
  ])

  const fetchAccessRequests = async (query: IDataTableQuery) => {
    const { filters, pageSize, page } = query
    let url = 'access-requests?'
    url += `pageSize=${pageSize}`
    url += `&page=${page + 1}`

    if (filters.length) {
      filters.forEach((filter: any) => {
        const { column, value } = filter

        if (typeof value === 'string') {
          if (column.field === 'email') {
            url += `&q=${column.field}:${value}`
          } else {
            url += `&${column.field}=${value}`
          }
        } else {
          value.forEach((val: string) => {
            url += `&${column.field}=${val}`
          })
        }
      })
    }

    try {
      const response: AxiosResponse = await apiService.get(url)

      return {
        data: response.data.accessRequests,
        page: query.page,
        totalCount: response.data.total,
      }
    } catch (error) {
      addToast(error.message, { appearance: 'error' })
    }
  }

  const handleRowClick = (rowData: IAccessRequest) => {
    setSelectedAccessRequest(rowData)
    toggleIsDetailsModalOpen()
  }

  const handleApproveClick = (rowData: IAccessRequest) => {
    setSelectedAccessRequest(rowData)
    toggleIsApprovalModalOpen()
  }

  const handleDeclineClick = (rowData: IAccessRequest) => {
    setSelectedAccessRequest(rowData)
    toggleIsDeclineModalOpen()
  }

  const handleAccessRequestDataChange = () => {
    dataTableRef.current && dataTableRef.current.onQueryChange()
  }

  return (
    <>
      <Head>
        <title key="title">Private Cloud - Access Requests</title>
      </Head>
      <PageTitle title="Access Requests" />
      <Grid container>
        <Grid item xs={12}>
          <DataTable
            tableRef={dataTableRef}
            options={TABLE_OPTIONS}
            data={(query: IDataTableQuery) => fetchAccessRequests(query)}
            onRowClick={(_e: MouseEvent, rowData: IAccessRequest) => handleRowClick(rowData)}
            columns={columns}
            icons={{
              SortArrow: forwardRef((props, _ref) => <ArrowDropDown {...props} />),
            }}
            actions={[
              (rowData: IAccessRequest) => ({
                icon: 'check',
                tooltip: rowData.status === STATUS['pending'] ? 'approve request' : null,
                onClick: (_e: MouseEvent, rowData: IAccessRequest) => handleApproveClick(rowData),
                disabled: rowData.status !== STATUS['pending'],
              }),
              (rowData: IAccessRequest) => ({
                icon: 'close',
                tooltip: rowData.status === STATUS['pending'] ? 'decline request' : null,
                onClick: (_e: MouseEvent, rowData: IAccessRequest) => handleDeclineClick(rowData),
                disabled: rowData.status !== STATUS['pending'],
              }),
            ]}
          />
        </Grid>
      </Grid>
      <AccessRequestApproveModal onApprove={handleAccessRequestDataChange} />
      <AccessRequestDeclineModal onDecline={handleAccessRequestDataChange} />
      <AccessRequestDetailsModal />
    </>
  )
}

export default AccessRequests
