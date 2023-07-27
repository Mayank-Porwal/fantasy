import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../../container/Login/actions';
import { updateLoggedInStatus } from '../../utils/appActions/actions';
import { checkIfLoggedIn } from '../../utils/helper';
import { tokens } from '../../utils/theme';
const Header = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* const colorMode = useContext(ColorModeContext); */
    const handleLogout = () => {
        const auth = checkIfLoggedIn();
        if (auth) {
            logOut();
        }
    };
    const logOut = () => {
        const cookieData = Object.entries(Cookies.get());
        for (const [key] of cookieData) {
            Cookies.remove(key);
        }
        dispatch(updateLoggedInStatus(false));
        dispatch(signInSuccess(null));
        navigate('/login');
    };
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: colors.primary[400],
                    borderRadius: '3px',
                }}
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                {/* <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton> */}
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleLogout()}>
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;
