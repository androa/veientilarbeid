import DagpengerOgYtelserInnhold from './dagpenger-og-ytelser-innhold';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useState } from 'react';
import { hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';

function DagpengerOgYtelser() {
    const YTELSER_TEMA_VIS_KEY = 'ytelser_tema_vis_key';
    const amplitudeData = useAmplitudeData();

    const [valgtYtelserVisning, setValgtYtelserVisning] = useState<string>(
        hentFraBrowserStorage(YTELSER_TEMA_VIS_KEY) || 'dagpenger'
    );

    const handleByttKortKlikk = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: 'ytelser',
            handling: `Avviser dagpenger-tema`,
            ...amplitudeData,
        });

        const valgtVisning = valgtYtelserVisning === 'dagpenger' ? 'ytelser' : 'dagpenger';
        setValgtYtelserVisning(valgtVisning);
        settIBrowserStorage(YTELSER_TEMA_VIS_KEY, valgtVisning);
    };

    const featureToggles = useFeatureToggleData();

    if (!featureToggles['veientilarbeid.ny-dagpengekomponent']) return null;

    return <DagpengerOgYtelserInnhold handleByttKortKlikk={handleByttKortKlikk} valgtVisning={valgtYtelserVisning} />;
}

export default DagpengerOgYtelser;
