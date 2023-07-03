export enum CREATE_TEAM_FLOW {
    ALL_PLAYERS = 'ALL_PLAYERS',
    SELECTED_PLAYERS = 'SELECTED_PLAYERS',
}

export const CREATE_TEAM_VALIDATION_MESSAGES = {
    MAXIMUM_ALLOWED_PLAYERS: 'Maximum of 11 players are allowed in a Team',
    ELEVEN_PLAYERS_REQUIRED_TO_CREATE_A_TEAM: '11 players are required to create a team',
    MINIMUM_PLAYERS_REQUIRED: 'Minimum of 1 player from each category is required to create a team',
};
