import ArticleIcon from '@mui/icons-material/Article';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ImageIcon from '@mui/icons-material/Image';

export default function Settings({sourceType, handleSourceType}) {

  return (
    <div className="Settings">
        <ToggleButtonGroup
        value={sourceType}
        exclusive
        onChange={handleSourceType}
        aria-label="text alignment"
        >
        <ToggleButton value="document" aria-label="document">
            <ArticleIcon />Document
        </ToggleButton>
        <ToggleButton value="image" aria-label="image">
            <ImageIcon />Image
        </ToggleButton>
        </ToggleButtonGroup>
    </div>
  );
}