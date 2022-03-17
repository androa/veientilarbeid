import { DpInnsynPaabegynt, useDpInnsynPaabegyntData } from '../../../contexts/dp-innsyn-paabegynt';
import { BodyShort, Link } from '@navikt/ds-react';
import { loggAktivitet } from '../../../metrics/metrics';
import { useAmplitudeData } from '../../../contexts/amplitude-context';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER = {
    nb: {
        pabegynt: 'Du har også en påbegynt søknad du kan',
        fortsette: 'fortsette på',
    },
    en: {
        pabegynt: 'You also have an ongoing application that you can',
        fortsette: 'continue on',
    },
};

const PaabegynteSoknader = ({ dato, komponent }: { dato?: string; komponent: string }) => {
    const amplitudeData = useAmplitudeData();
    const paabegynteSoknader = useDpInnsynPaabegyntData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    if (!dato) {
        return null;
    }

    const sistePabegynteSoknad = paabegynteSoknader.sort(
        (a: DpInnsynPaabegynt, b: DpInnsynPaabegynt) =>
            new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime()
    )[0];

    const harPaabegyntSoknadNyereEnnDato =
        sistePabegynteSoknad && new Date(sistePabegynteSoknad.sistEndret).getTime() > new Date(dato).getTime();

    if (!harPaabegyntSoknadNyereEnnDato) {
        return null;
    }

    return (
        <BodyShort className={'blokk-xs'}>
            {tekst('pabegynt')}{' '}
            <Link
                className={'tracking-wide'}
                href={sistePabegynteSoknad.behandlingsId}
                onClick={() =>
                    loggLenkeKlikk(
                        `Fortsetter på søknad - fra "dagpenger-tema - ${komponent}"`,
                        sistePabegynteSoknad.behandlingsId
                    )
                }
            >
                {tekst('fortsette')}
            </Link>
            .
        </BodyShort>
    );
};

export default PaabegynteSoknader;
