import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from '../../utils/store/rootReducer';
import { useEffect } from 'react';
import { useMode } from '../../utils/theme';
const FantasyGlobalComponent = () => {
    const [theme] = useMode();
    const propsState = useSelector((state: RootState) => {
        return {
            notification: state.appReducer.notification,
            loader: state.appReducer.showLoader,
        };
    });
    useEffect(() => {
        if (propsState.notification && propsState.notification?.message) {
            switch (propsState.notification?.type) {
                case 'success':
                    toast.success(propsState.notification?.message);
                    break;
                case 'error':
                    toast.error(propsState.notification?.message);
                    break;
                case 'warning':
                    toast.warn(propsState.notification?.message);
                    break;
                default:
                    toast.info(propsState.notification?.message);
            }
        }
    }, [propsState.notification]);
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme.palette.mode}
        />
    );
};

export default FantasyGlobalComponent;
