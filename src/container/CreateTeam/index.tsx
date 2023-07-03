import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardTable from '../../component/CardTable';
import { updateToastState } from '../../utils/appActions/actions';
import { RootState } from '../../utils/store/rootReducer';
import { getAllPlayers, updateSelectedPlayers } from './actions';
import { CREATE_TEAM_FLOW, CREATE_TEAM_VALIDATION_MESSAGES } from './constants';
import {
    checkMaximumPlayerAllowedValidation,
    getFilteredData,
    minimumPlayersByCategory,
    searchAvailablePlayers,
    updatePlayerList,
} from './helper';
import { PLAYERS_INTERFACE } from './types';
import { MAXIMUM_ALLOWED_PLAYERS } from '../../utils/constants';
const CreateTeam = () => {
    const propsState = useSelector((state: RootState) => {
        return {
            allPlayer: state.createTeamReducer.allPlayers,
            allPlayerError: state.createTeamReducer.allPlayersFailure,
            selectedPlayers: state.createTeamReducer.selectedPlayers,
        };
    });
    const [filteredAllPlayers, setFilteredAllPlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer);
    const [availablePlayers, setAvailablePlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer);
    const [availableSelectedPlayers, setAvailableSelectedPlayers] = useState<PLAYERS_INTERFACE[] | []>([]);
    const [tabsValue, setTabsValue] = useState<string>('All');
    const [availablePlayersSearch, setAvailablePlayersSearch] = useState<string>('');
    //const [searchSelectedPlayers, setSearchSelectedPlayers] = useState<string>('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (propsState.allPlayer && propsState.allPlayer.length === 0) {
            dispatch(getAllPlayers());
        }
    }, []);
    useEffect(() => {
        if (propsState.allPlayer) {
            setAvailablePlayers(propsState.allPlayer);
            setFilteredAllPlayers(propsState.allPlayer);
        }
    }, [propsState.allPlayer]);
    useEffect(() => {
        if (propsState.allPlayerError) {
            dispatch(updateToastState({ message: propsState.allPlayerError, type: 'error' }));
        }
    }, [propsState.allPlayerError]);
    const handleActions = (data: PLAYERS_INTERFACE, flow: string) => {
        if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
            if (checkMaximumPlayerAllowedValidation(availableSelectedPlayers)) {
                const { allPlayers, selectedPlayers } = updatePlayerList(
                    data,
                    availablePlayers,
                    propsState.selectedPlayers,
                );
                setAvailablePlayers(allPlayers);
                const filteredData = getFilteredData(allPlayers, tabsValue, availablePlayersSearch);
                setFilteredAllPlayers(filteredData);
                dispatch(updateSelectedPlayers(selectedPlayers));
                setAvailableSelectedPlayers(selectedPlayers);
            } else {
                dispatch(
                    updateToastState({
                        message: CREATE_TEAM_VALIDATION_MESSAGES.MAXIMUM_ALLOWED_PLAYERS,
                        type: 'error',
                    }),
                );
            }
        } else {
            const { allPlayers, selectedPlayers } = updatePlayerList(
                data,
                propsState.selectedPlayers,
                filteredAllPlayers,
            );
            setAvailablePlayers(selectedPlayers);
            setFilteredAllPlayers(selectedPlayers);
            dispatch(updateSelectedPlayers(allPlayers));
            setAvailableSelectedPlayers(allPlayers);
        }
    };
    const handleOnSearch = (availPlayers: PLAYERS_INTERFACE[] | [], flow: string, searchString: string) => {
        if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
            const filterData = getFilteredData(availPlayers, tabsValue, searchString);
            setFilteredAllPlayers(filterData);
            setAvailablePlayersSearch(searchString);
        } else {
            const filterData = searchAvailablePlayers(availPlayers, searchString);
            dispatch(updateSelectedPlayers(filterData));
            //setSearchSelectedPlayers(searchString);
        }
    };
    const handleTabsChange = (tabsValue: string) => {
        setTabsValue(tabsValue);
        const availableData = getFilteredData(availablePlayers, tabsValue, availablePlayersSearch);
        setFilteredAllPlayers(availableData);
        //setAvailablePlayers(availableData);
    };
    const handleSaveTeam = () => {
        const validationCheck = minimumPlayersByCategory(availableSelectedPlayers);
        if (!validationCheck.error) {
        } else {
            dispatch(updateToastState({ message: validationCheck.message, type: 'error' }));
        }
    };
    return (
        <>
            <Grid
                container
                direction="row"
                sx={{ margin: '2% 0%' }}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        Create Team
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={3} md={3}>
                    <span style={{ fontWeight: 'bold' }}>
                        Selected Players: {availableSelectedPlayers && availableSelectedPlayers.length}/(
                        {MAXIMUM_ALLOWED_PLAYERS.CRICKET})
                    </span>
                </Grid>
                <Grid item xs={2} sm={1} md={1}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        disabled={checkMaximumPlayerAllowedValidation(availableSelectedPlayers)}
                        onClick={handleSaveTeam}
                    >
                        Save Team
                    </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={12} sm={12} md={65} lg={6}>
                    <CardTable
                        filter={true}
                        availablePlayers={filteredAllPlayers}
                        handleActions={handleActions}
                        flow={CREATE_TEAM_FLOW.ALL_PLAYERS}
                        onSearch={handleOnSearch}
                        onTabsChange={handleTabsChange}
                        allPlayers={availablePlayers}
                        tabsValue={tabsValue}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CardTable
                        filter={false}
                        availablePlayers={propsState.selectedPlayers}
                        handleActions={handleActions}
                        flow={CREATE_TEAM_FLOW.SELECTED_PLAYERS}
                        allPlayers={availableSelectedPlayers}
                        onSearch={handleOnSearch}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default CreateTeam;
