import FantasyTextField from '../../../../component/FormElements/TextFlied'

export const getManageLeaguesDetailsColumns = (handleTeamMatch: Function) => [
  {
    accessorKey: 'rank',
    accessorFn: (row: any) => <div>{row.rank > 0 ? row.rank : '-'}</div>,
    id: 'rank',
    header: 'Rank',
    size: 150,
    style: {
      textAlign: 'center',
    },
    Filter: () => {
      return
    },
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorFn: (row: any) => (
      <div onClick={() => handleTeamMatch(row)} style={{ color: '#0070E0', cursor: 'pointer' }}>
        {row.team_name ? row.team_name : '-'}
      </div>
    ),
    accessorKey: 'team_name',
    id: 'team_name',
    header: 'Team Name',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <FantasyTextField
          id={'teamName'}
          label=''
          value={column.getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            column.setFilterValue(event.target.value)
          }}
          required={false}
          placeholder={'Filter by Team Name'}
        />
      )
    },
  },
  {
    accessorKey: 'team_owner',
    id: 'team_owner',
    header: 'Team Owner',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <div style={{ margin: '8px 0px' }}>
          <FantasyTextField
            id={'teamOwner'}
            label=''
            value={column.getFilterValue()}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              column.setFilterValue(event.target.value)
            }}
            required={false}
            placeholder={'Filter by Team Owner'}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'remaining_subs',
    id: 'remaining_subs',
    header: 'Remaining Subs',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <FantasyTextField
          id={'remainingSubs'}
          label=''
          value={column.getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            column.setFilterValue(event.target.value)
          }}
          required={false}
          placeholder={'Filter by Remaining Subs'}
        />
      )
    },
  },
  {
    accessorKey: 'points',
    id: 'points',
    header: 'Points',
    size: 150,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Filter: () => {
      return
    },
  },
]
