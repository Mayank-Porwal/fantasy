import { Badge, Typography } from '@mui/material'
import FantasyDropdowns from '../../component/FormElements/FantasyDropdowns'
import FantasyTextField from '../../component/FormElements/TextFlied'
import AddCircleIcon from '@mui/icons-material/AddCircle'
export const getManageLeaguesColumns = (handleLeagueActions: Function) => [
  {
    accessorFn: (row: any) => (
      <div
        onClick={() =>
          handleLeagueActions(`/league-details?league=${row.league_id}&leagueName=${row.league_name}`, row)
        }
        style={{ color: '#0070E0', cursor: 'pointer' }}
      >
        {row.league_name ? row.league_name : '-'}
      </div>
    ),
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
      <div onClick={() => handleLeagueActions('/teams', row)} style={{ color: '#0070E0', cursor: 'pointer' }}>
        {row.team_name ? row.team_name : '-'}
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

export const getPublicLeaguesColumns = (handlePublicLeagueActions: Function, colors: any) => [
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
    accessorKey: 'owner_first_name',
    id: 'firstName',
    header: 'Owner First Name',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <FantasyTextField
          id={'firstName'}
          label=''
          value={column.getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            column.setFilterValue(event.target.value)
          }}
          required={false}
          placeholder={'Filter by Owner First Name'}
        />
      )
    },
  },
  {
    accessorKey: 'owner_last_name',
    id: 'lastName',
    header: 'Owner Last Name',
    size: 150,
    Filter: ({ column }: any) => {
      return (
        <FantasyTextField
          id={'lastName'}
          label=''
          value={column.getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            column.setFilterValue(event.target.value)
          }}
          required={false}
          placeholder={'Filter by Owner Last Name'}
        />
      )
    },
  },
  {
    accessorFn: (row: any) => (
      <div onClick={() => handlePublicLeagueActions(row)} style={{ cursor: 'pointer' }}>
        <Typography
          sx={{
            cursor: 'pointer',
            color: colors.greenAccent[500],
          }}
          variant='subtitle1'
          color={'text.secondary'}
          component='div'
          onClick={() => {}}
        >
          <AddCircleIcon />
        </Typography>
      </div>
    ),
    accessorKey: 'action',
    id: 'action',
    header: 'Join League',
    size: 150,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    enableColumnActions: false,
    enableColumnFilter: false,
    enableColumnFilterModes: false,
    renderColumnFilterModeMenuItems: false,
    Filter: () => {
      return
    },
  },
]
