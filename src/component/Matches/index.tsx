import React, { memo } from 'react'
import { CurrentMatch } from '../../utils/appActions/types'
import moment from 'moment'
import { useTheme } from '@mui/material'
import { tokens } from '../../utils/theme'
interface Props {
  [key: string]: any
  currentMatch: CurrentMatch[] | null
}
const Matches = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
      {props.currentMatch &&
        props.currentMatch.map((match, index) => {
          return (
            <React.Fragment key={match.match_time}>
              <div
                style={{
                  border: `${index === 0 ? `1px solid ${colors.greenAccent[400]}` : '1px solid white'}`,
                  padding: '2%',
                  margin: ' 0% 1% 1% 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '10px', textAlign: 'center', marginBottom: '1px' }}>
                  {moment.utc(match.match_time).local().format('DD-MM-YYYY HH:mm')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div>
                    <img width={25} height={25} src={match.teamA.image} />
                  </div>
                  <div style={{ margin: '0px 10px', fontSize: '10px' }}>vs</div>
                  <div>
                    <img width={25} height={25} src={match.teamB.image} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        })}
    </div>
  )
}

export default memo(Matches)
