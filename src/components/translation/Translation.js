import './Translation.css'

export default function Translation({translation}) {

    return (
        <div className="Translation">
            {(translation!=='') && <div className="translation-text">{translation}</div>}
        </div>
    );

}