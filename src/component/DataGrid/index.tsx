import React, { useMemo } from 'react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import FantasyButtons from '../FormElements/Buttons'

interface ColumnsInterface {
  id: string
  header: string
  size: number
  accessorKey: string
}
interface GridActionsInterface {
  id: string
  label: string
  onClick: Function
  disabled?: boolean
  buttonType?: 'text' | 'outlined' | 'contained' | undefined
  className?: string
  width?: string
}
interface Props {
  columns: ColumnsInterface[]
  data: any
  pagination: boolean
  onCallback: Function
  gridActions?: GridActionsInterface[] | []
  pageCount: number
  rowCount: number
}

const FantasyDataGrid = (props: Props) => {
  const columns = useMemo<MRT_ColumnDef[] | []>(() => {
    return props.columns
  }, [props.columns])
  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={props.data ? props.data : []}
        enableColumnFilterModes={false}
        enableColumnOrdering
        enableGrouping={false}
        enablePinning={false}
        enableRowActions={false}
        enableHiding={true}
        enableColumnActions={false}
        enableRowSelection={false}
        enableSorting={false}
        enableEditing={false}
        initialState={{ showColumnFilters: false }}
        positionToolbarAlertBanner='bottom'
        enableGlobalFilterModes={false}
        enableGlobalFilter={false}
        enablePagination
        pageCount={props.pageCount ? props.pageCount : 0}
        rowCount={props.rowCount ? props.rowCount : 0}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10],
          showFirstButton: true,
          showLastButton: true,
        }}
        renderTopToolbarCustomActions={({ table }: any) => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {props.gridActions &&
                props.gridActions.map((action) => {
                  return (
                    <FantasyButtons
                      disabled={!table.getIsSomeRowsSelected()}
                      id={action.id}
                      label={action.label}
                      onClick={action.onClick}
                      buttonType={action.buttonType ? action.buttonType : 'contained'}
                      className={action.className ? action.className : ''}
                      width={action.width ? action.width : '100%'}
                    />
                  )
                })}
            </div>
          )
        }}
      />
    </div>
  )
}

export default FantasyDataGrid
