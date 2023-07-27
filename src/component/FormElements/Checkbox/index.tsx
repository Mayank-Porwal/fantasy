import { Checkbox, FormControlLabel } from '@mui/material';
interface Props {
    id: string;
    label: string;
    onChange: Function;
    value: boolean;
}
const FantasyCheckbox = (props: Props) => {
    return (
        <FormControlLabel
            control={<Checkbox onChange={(event) => props.onChange(event)} checked={props.value} />}
            label={props.label}
        />
    );
};

export default FantasyCheckbox;
