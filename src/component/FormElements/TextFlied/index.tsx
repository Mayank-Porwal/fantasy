import { TextField, InputAdornment, useTheme } from '@mui/material';
import { tokens } from '../../../utils/theme';
interface Props {
    id: string;
    label: string;
    onChange: Function;
    endAdornment?: any;
    placeholder?: string;
}
const FantasyTextField = (props: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <TextField
            fullWidth
            placeholder={props.placeholder ? props.placeholder : ''}
            label={props.label}
            id={props.id}
            sx={{
                m: 1,
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: colors.greenAccent[500],
                    },
                },
            }}
            onChange={(e) => props.onChange(e)}
            InputLabelProps={{ style: { color: colors.primary[100] }, shrink: true }}
            InputProps={{
                endAdornment: <InputAdornment position="start">{props.endAdornment}</InputAdornment>,
            }}
        />
    );
};

export default FantasyTextField;
