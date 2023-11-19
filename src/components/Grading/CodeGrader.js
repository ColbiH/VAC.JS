import React, {memo} from 'react';

const CodeGrader = memo(({data}) => {
    const fileUrl = 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi';
    window.api.StartDownload(fileUrl);
});

    //return (
    //<div>
    // <LaTeXWasm template={Template(data)} />
    //</div>
    //);


export default CodeGrader;
