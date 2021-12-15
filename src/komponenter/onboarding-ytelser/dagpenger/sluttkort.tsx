import HarIkkeSokt from './sluttkort-har-ikke-sokt';
import HarPabegyntSoknad from './sluttkort-har-paabegynt-soknad';
import HarSokt from './sluttkort-har-sokt';
import MottarDagpenger from './sluttkort-faar-dagpenger';
import InnvilgetDagpenger from './sluttkort-innvilget-dagpenger';
import AvslagDagpenger from './sluttkort-avslag-dagpenger';
import { useBrukerinfoData } from '../../../contexts/bruker-info';
import { useBrukerregistreringData } from '../../../contexts/brukerregistrering';
import { usePaabegynteSoknaderData } from '../../../contexts/paabegynte-soknader';
import { useDpInnsynSoknadData } from '../../../contexts/dp-innsyn-soknad';
import { useDpInnsynVedtakData } from '../../../contexts/dp-innsyn-vedtak';
import beregnDagpengeStatus from '../../../lib/beregn-dagpenge-status';

function hentAktueltSluttkort(situasjon: string) {
    if (situasjon === 'paabegynt') {
        return HarPabegyntSoknad;
    } else if (situasjon === 'sokt') {
        return HarSokt;
    } else if (situasjon === 'mottar') {
        return MottarDagpenger;
    } else if (situasjon === 'innvilget') {
        return InnvilgetDagpenger;
    } else if (situasjon === 'avslag') {
        return AvslagDagpenger;
    } else {
        return HarIkkeSokt;
    }
}

function Sluttkort() {
    const brukerInfoData = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const paabegynteSoknader = usePaabegynteSoknaderData().soknader;
    const innsendteSoknader = useDpInnsynSoknadData();
    const dagpengeVedtak = useDpInnsynVedtakData();

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
    });

    const AktueltSluttkort = hentAktueltSluttkort(dagpengeStatus);
    return <AktueltSluttkort />;
}

export default Sluttkort;
