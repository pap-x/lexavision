import './Translation.css'

export default function Translation({translation}) {

    if (translation!='') {
        return (
            <div className="Translation">
                <div className="translation-text">{translation}</div>
            </div>
        );
    }
    else {
        return null;
    }
}