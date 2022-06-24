import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Language.css'

export default function Language({from, handleFrom, to, handleTo}) {

    const languages = ['English', 'German', 'Spanish', 'French', 'Greek'];

    return (
        <div className="Language">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="from-label">From</InputLabel>
                <Select
                labelId="from-label"
                id="from"
                value={from}
                label="From"
                onChange={handleFrom}>

                {languages.map((lang, i) => {
                    if (lang===to) {
                        return <MenuItem disabled key={i} value={lang}>{lang}</MenuItem>
                    }
                    else {
                        return <MenuItem key={i} value={lang}>{lang}</MenuItem>
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
                        return <MenuItem disabled key={i} value={lang}>{lang}</MenuItem>
                    }
                    else {
                        return <MenuItem key={i} value={lang}>{lang}</MenuItem>
                    }
                })}
                </Select>
            </FormControl>
        
        </div>
    );
}