import React, {useEffect, useState, memo} from 'react';
import logo from './logo.svg';
import './App.css';
import {_request} from './utils/utils'
import {HTTPS_HEADERS, REQUEST_TYPE} from './utils/constants'
import RouteComponent from './utils/routes';
interface TeamData {
  cap: number,
  category: string,
  id: number,
  img: string,
  name: string,
  team: string
}
function App() {
  const [teamData, setTeamData] = useState<TeamData[] | []>([]);
  const fecthData = () => {
    _request ({
      url: 'http://127.0.0.1:5000/players/team?team=rr',
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    }).then((result) => result).then((res) => {
      setTeamData(res.data);
      console.log(res)
    }).catch((err) => {
      console.error(err);
    })
  }
  useEffect(() => {
    fecthData();
  }, [])
  return (
    <div className="App">
      <RouteComponent />
      {
        teamData && Array.isArray(teamData) && teamData.map((x: TeamData)=> {
          return <>{x.name} {x.team}</>
        })
      }
    </div>
  );
}

export default memo(App);
