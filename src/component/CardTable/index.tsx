import { Grid, useTheme } from '@mui/material';
import FantasyTextField from '../FormElements/TextFlied';
import { tokens } from '../../utils/theme';
import SearchIcon from '@mui/icons-material/Search';
import FantasyTabs from '../FantasyTabs';
import { DEFAULT_AVAILABLE_PLAYERS_TABS_DATA } from './constants';
import { PLAYERS_INTERFACE } from '../../container/CreateTeam/types';
import Cards from '../Cards';
import { CREATE_TEAM_FLOW } from '../../container/CreateTeam/constants';
interface Props {
    filter: boolean;
    availablePlayers?: PLAYERS_INTERFACE[] | [] | null;
    handleActions: Function;
    flow?: string;
    onSearch?: Function;
    onTabsChange?: Function;
    allPlayers?: PLAYERS_INTERFACE[] | [] | null;
    tabsValue?: string;
}
const CardTable = (props: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const onSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (props.onSearch) {
            props.onSearch(props.allPlayers, props.flow, event.target.value);
        }
    };
    const handleTabsChange = (tabsValue: string) => {
        if (props.onTabsChange) {
            props.onTabsChange(tabsValue);
        }
    };
    return (
        <div>
            <Grid
                container
                direction="row"
                sx={{ backgroundColor: colors.primary[400] }}
                alignItems={'center'}
                justifyContent={''}
                spacing={0}
            >
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ marginRight: '10px' }}>
                    <FantasyTextField
                        id="searchAvailablePlayers"
                        label="Search"
                        onChange={onSearch}
                        endAdornment={<SearchIcon />}
                    />
                </Grid>
                {props.filter && (
                    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                        <FantasyTabs
                            tabsData={DEFAULT_AVAILABLE_PLAYERS_TABS_DATA}
                            onChange={handleTabsChange}
                            value={props.tabsValue ? props.tabsValue : ''}
                        />
                    </Grid>
                )}
            </Grid>
            <div
                style={{
                    backgroundColor: colors.primary[400],
                    height: '80vh',
                    overflowY: 'auto',
                    marginTop: '1%',
                }}
            >
                {props.availablePlayers &&
                    props.availablePlayers.map((player) => {
                        return (
                            <div
                                key={player.id}
                                style={{
                                    width: '100%',
                                    padding: '2px',
                                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                }}
                            >
                                <Cards
                                    flow={props.flow ? props.flow : CREATE_TEAM_FLOW.ALL_PLAYERS}
                                    keyItem={player.id}
                                    player={player}
                                    handleActions={props.handleActions}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default CardTable;
