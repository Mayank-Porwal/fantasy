import { memo, useEffect } from 'react';
import './App.css';
//import { HTTPS_HEADERS, REQUEST_TYPE } from './utils/constants';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux/es/exports';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import FantasyGlobalComponent from './component/FantasyGlobalComponent';
import Header from './component/Header';
import AppSidebar from './component/Sidebar';
import RouteComponent from './utils/routes';
import { store } from './utils/store/store';
import { ColorModeContext, useMode } from './utils/theme';
//import { _request } from './utils/utils';
/* interface TeamData {
  cap: number,
  category: string,
  id: number,
  img: string,
  name: string,
  team: string
} */
function App() {
    //const [teamData, setTeamData] = useState<TeamData[] | []>([]);
    /* const fetchData = () => {
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
  } */
    useEffect(() => {
        //fetchData();
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Application />
            </BrowserRouter>
        </Provider>
    );
}
const Application = () => {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <AppSidebar />
                    <main className="content">
                        <Header />
                        <div className="route-container">
                            <RouteComponent />
                            <FantasyGlobalComponent />
                            {/* Same as */}
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
export default memo(App);
