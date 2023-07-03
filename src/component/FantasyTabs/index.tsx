import { Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { DEFAULT_AVAILABLE_PLAYERS_TABS_DATA } from '../CardTable/constants';
interface Props {
    tabsData: { id: string; name: string }[] | [];
    onChange: Function;
    value: string;
}
export default function FantasyTabs(props: Props) {
    const [value, setValue] = React.useState(props.value ? props.value : DEFAULT_AVAILABLE_PLAYERS_TABS_DATA[0].id);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        props.onChange(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Fantasy Tabs"
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
        >
            {props.tabsData &&
                props.tabsData.map((tab) => {
                    return <Tab key={tab.id} value={tab.id} label={tab.name} />;
                })}
        </Tabs>
    );
}
