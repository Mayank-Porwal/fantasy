export interface PLAYERS_INTERFACE {
    cap: string;
    category: string;
    id: number;
    img: any;
    name: string;
    team: string;
}

export interface CreateTeamInterface {
    name: string;
    players: CreateTeamPlayers[];
    user_name: string;
}

export interface CreateTeamPlayers {
    name: string;
    captain: boolean;
    vice_captain: boolean;
}

export interface CaptainInterface {
    captains: { name: string; id: number };
    viceCaptains: { name: string; id: number };
}
