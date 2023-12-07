import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Avatar, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { C, CREATE_TEAM_FLOW, VC } from '../../container/CreateTeam/constants'
import { CaptainInterface, PLAYERS_INTERFACE } from '../../container/CreateTeam/types'
import img from '../../static/images/account-icon.png'
import { CATEGORY_ENUM } from '../../utils/constants'
import { getEnumValueByKey } from '../../utils/helper'
import { tokens } from '../../utils/theme'
interface Props {
  keyItem?: string
  player?: PLAYERS_INTERFACE
  handleActions: Function
  flow?: string
  handleChipSelection?: Function
  captainData?: CaptainInterface | null
  handleCardClick?: Function
}
const Cards = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const handleClickActions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    props.handleActions(props.player, props.flow ? props.flow : CREATE_TEAM_FLOW.ALL_PLAYERS)
  }
  const handleCaptainChipSelection = (event: React.MouseEvent<HTMLElement>, captainViceCaptain: string) => {
    event.stopPropagation()
    if (props.handleChipSelection) {
      props.handleChipSelection(captainViceCaptain, props.player)
    }
  }
  return (
    <Card
      key={props.keyItem ? props.keyItem : ''}
      sx={{ display: 'flex', width: '100%', height: '85px', cursor: props.handleCardClick ? 'pointer' : '' }}
      onClick={() => {
        if (props.handleCardClick) {
          props.handleCardClick(props.player ? props.player : null)
        }
      }}
    >
      <CardMedia
        component='img'
        sx={{ width: 85, height: 85, color: 'white' }}
        image={props.player ? (props.player.img ? props.player.img : img) : null}
        alt={props.player ? props.player.img : null}
      />
      <CardContent sx={{ width: '100%' }}>
        <Grid container direction='row' alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={4}>
            <Typography component='div' variant='h5'>
              {props.player ? props.player.name : null}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {props.player ? getEnumValueByKey(CATEGORY_ENUM, props.player.category) : null}
            </Typography>
          </Grid>
          <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 4}>
            <Typography component='div' variant='h5'>
              Team
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {/* {props.player ? props.player.team : null} */}
              {props.player?.team_img && <img src={props.player.team_img} width='20px' height='20px' />}
            </Typography>
          </Grid>
          <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 3}>
            <Typography component='div' variant='h5'>
              Cap
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>
              {props.player ? props.player.cap : null}
            </Typography>
          </Grid>
          {props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS && (
            <Grid item xs={3}>
              <Typography component='div' variant='h5'>
                Game Changers
              </Typography>
              <Stack direction='row' spacing={2}>
                <Avatar
                  onClick={(event) => {
                    if (props.handleChipSelection) {
                      handleCaptainChipSelection(event, C)
                    }
                  }}
                  sx={{
                    width: 15,
                    height: 15,
                    fontSize: '9px',
                    bgcolor:
                      props.player && props.captainData && props.captainData?.captains?.id === props.player.id
                        ? colors.greenAccent[500]
                        : colors.grey[500],
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  C
                </Avatar>
                <Avatar
                  onClick={(event) => {
                    if (props.handleChipSelection) {
                      handleCaptainChipSelection(event, VC)
                    }
                  }}
                  sx={{
                    width: 15,
                    height: 15,
                    fontSize: '9px',
                    bgcolor:
                      props.player && props.captainData && props.captainData.viceCaptains?.id === props.player.id
                        ? colors.blueAccent[500]
                        : colors.grey[500],
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  VC
                </Avatar>
              </Stack>
            </Grid>
          )}
          <Grid item xs={1}>
            <Typography
              sx={{
                cursor: 'pointer',
                color:
                  props.flow && props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS
                    ? colors.redAccent[500]
                    : colors.greenAccent[500],
              }}
              variant='subtitle1'
              color={'text.secondary'}
              component='div'
              onClick={(event) => handleClickActions(event)}
            >
              {props.flow && props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? <DeleteIcon /> : <AddCircleIcon />}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Cards
