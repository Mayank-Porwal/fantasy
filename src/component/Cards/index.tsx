import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardMedia, Chip, Grid, Typography, useTheme } from '@mui/material';
import { C, CREATE_TEAM_FLOW, VC } from '../../container/CreateTeam/constants';
import { CaptainInterface, PLAYERS_INTERFACE } from '../../container/CreateTeam/types';
import img from '../../static/images/account-icon.png';
import { CATEGORY_ENUM } from '../../utils/constants';
import { getEnumValueByKey } from '../../utils/helper';
import { tokens } from '../../utils/theme';
interface Props {
    keyItem?: string;
    player?: PLAYERS_INTERFACE;
    handleActions: Function;
    flow?: string;
    handleChipSelection?: Function;
    captainData?: CaptainInterface | null;
}
const Cards = (props: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Card key={props.keyItem ? props.keyItem : ''} sx={{ display: 'flex', width: '100%', height: '85px' }}>
            <CardMedia
                component="img"
                sx={{ width: 85, height: 85, color: 'white' }}
                image={props.player ? (props.player.img ? props.player.img : img) : null}
                alt={props.player ? props.player.img : null}
            />
            <CardContent sx={{ width: '100%' }}>
                <Grid container direction="row" alignItems={'center'} justifyContent={'center'}>
                    <Grid item xs={4}>
                        <Typography component="div" variant="h5">
                            {props.player ? props.player.name : null}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.player ? getEnumValueByKey(CATEGORY_ENUM, props.player.category) : null}
                        </Typography>
                    </Grid>
                    <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 4}>
                        <Typography component="div" variant="h5">
                            Team
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.player ? props.player.team : null}
                        </Typography>
                    </Grid>
                    <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 3}>
                        <Typography component="div" variant="h5">
                            Cap
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.player ? props.player.cap : null}
                        </Typography>
                    </Grid>
                    {props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS && (
                        <Grid item xs={3}>
                            <Typography component="div" variant="h5">
                                Game Changers
                            </Typography>
                            <Chip
                                onClick={() => {
                                    if (props.handleChipSelection) {
                                        props.handleChipSelection(C, props.player);
                                    }
                                }}
                                label="C"
                                sx={{
                                    m: '2px',
                                    cursor: 'pointer',
                                    backgroundColor:
                                        props.player &&
                                        props.captainData &&
                                        props.captainData.captains.id === props.player.id
                                            ? colors.greenAccent[500]
                                            : 'inherit',
                                }}
                            />
                            <Chip
                                onClick={() => {
                                    if (props.handleChipSelection) {
                                        props.handleChipSelection(VC, props.player);
                                    }
                                }}
                                label="VC"
                                sx={{
                                    m: '2px',
                                    cursor: 'pointer',
                                    backgroundColor:
                                        props.player &&
                                        props.captainData &&
                                        props.captainData.viceCaptains.id === props.player.id
                                            ? colors.blueAccent[500]
                                            : 'inherit',
                                }}
                            />
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
                            variant="subtitle1"
                            color={'text.secondary'}
                            component="div"
                            onClick={() =>
                                props.handleActions(
                                    props.player,
                                    props.flow ? props.flow : CREATE_TEAM_FLOW.ALL_PLAYERS,
                                )
                            }
                        >
                            {props.flow && props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? (
                                <DeleteIcon />
                            ) : (
                                <AddCircleIcon />
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Cards;
