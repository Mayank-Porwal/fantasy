import { Badge } from '@mui/material'
import FantasyDropdowns from '../../component/FormElements/FantasyDropdowns'
import FantasyTextField from '../../component/FormElements/TextFlied'
import { useNavigate } from 'react-router-dom'
export const getManageLeaguesColumns = (handleLeagueActions: Function) => [
  {
    accessorKey: 'league_name',
    id: 'league_name',
    header: 'League Name',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <FantasyTextField
          id={'leagueName'}
          label=''
          value={column.getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            column.setFilterValue(event.target.value)
          }}
          required={false}
          placeholder={'Filter by League Name'}
        />
      )
    },
  },
  {
    accessorKey: 'type',
    id: 'type',
    header: 'League Type',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <div style={{ margin: '8px 0px' }}>
          <FantasyDropdowns
            id={'leagueType'}
            label=''
            value={column.getFilterValue()}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              column.setFilterValue(event.target.value)
            }}
            options={[
              { id: 'public', name: 'Public' },
              { id: 'private', name: 'Private' },
            ]}
            required={false}
            placeholder={'Select League Type'}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'team',
    id: 'team',
    header: 'Team Name',
    accessorFn: (row: any) => (
      <div onClick={() => handleLeagueActions('/teams', row)} style={{ color: 'blue', cursor: 'pointer' }}>
        {row.team ? row.team : '-'}
      </div>
    ),
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
    accessorKey: 'owner',
    accessorFn: (row: any) => <Badge color={row.owner ? 'success' : 'error'} badgeContent=' ' variant='dot' />,
    id: 'owner',
    header: 'Owner',
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
