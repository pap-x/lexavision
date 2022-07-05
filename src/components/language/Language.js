import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Language.css'

export default function Language({from, handleFrom, to, handleTo}) {

    const languages = [{text: 'English', symbol: 'EN'},
                        {text: 'German', symbol: 'DE'},
                        {text: 'French', symbol: 'FR'},
                        {text: 'Spanish', symbol: 'ES'},
                        {text: 'Chinese', symbol: 'ZH'},
                        {text: 'Dutch', symbol: 'NL'},
                        {text: 'Japanese', symbol: 'JA'},
                        {text: 'Italian', symbol: 'IT'},
                        {text: 'Russian', symbol: 'RU'},
                        {text: 'Greek', symbol: 'EL'}]
    return (
        <div className="Language">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="from-label">From</InputLabel>
                <Select
                labelId="from-label"
                defaultValue={"auto"}
                id="from"
                value={from}
                label="From"
                onChange={handleFrom}>
                <MenuItem key="auto" value="auto"><b>Auto</b></MenuItem>
                {languages.map((lang, i) => {
                    if (lang===to) {
                        return <MenuItem disabled key={i} value={lang.symbol}>{lang.text}</MenuItem>
                    }
                    else {
                        return <MenuItem key={i} value={lang.symbol}>{lang.text}</MenuItem>
                    }
                })}
                </Select>
            </FormControl>
            <ArrowForwardIosIcon className="icon" fontSize="large"/>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="to-label">To</InputLabel>
                <Select
                labelId="to-label"
                id="to"
                value={to}
                label="To"
                onChange={handleTo}>

                {languages.map((lang, i) => {
                    if (lang===from) {
                        return <MenuItem disabled key={i} value={lang.symbol}>{lang.text}</MenuItem>
                    }
                    else {
                        return <MenuItem key={i} value={lang.symbol}>{lang.text}</MenuItem>
                    }
                })}
                </Select>
            </FormControl>
        
        </div>
    );
}