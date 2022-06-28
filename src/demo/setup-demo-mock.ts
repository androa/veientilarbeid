import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    FEATURE_URL,
    MELDEKORTSTATUS_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    UNDER_OPPFOLGING_URL,
    VEILARBOPPFOLGING_URL,
    DP_INNSYN_URL,
    GJELDER_FRA_DATO_URL,
    AUTH_API,
    ARBEIDSSOKERPERIODER_URL,
} from '../ducks/api';

import {
    hentAlder,
    hentAutentiseringsInfo,
    hentEgenvurdering,
    hentFeatureToggles,
    hentFormidlingsgruppe,
    hentGeografiskTilknytning,
    hentKanReaktiveres,
    hentMotestotte,
    hentRegistreringType,
    hentReservasjonKRR,
    hentRettighetsgruppe,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    hentUnderOppfolging,
    lagMeldekortData,
    randomUlesteDialoger,
    hentDpInnsynVedtak,
    hentDpInnsynSoknad,
    hentDpInnsynPaabegynte,
    settGjelderFraDato,
} from './demo-state';

import { hentBrukerRegistrering } from './demo-state-brukerregistrering';
import msw_get from '../mocks/msw-utils';
import meldekortstatusResponse from '../mocks/meldekortstatus-mock';
import gjelderFraDatoMock from '../mocks/gjelderfra-mock';
import { rest, RestRequest } from 'msw';
import arbeidssokerPerioderResponse from '../mocks/arbeidssoker-perioder-mock';

interface GjelderFraBody {
    dato: string;
}

export const demo_handlers = [
    msw_get(VEILARBOPPFOLGING_URL, {
        underOppfolging: true,
        kanReaktiveres: hentKanReaktiveres(),
        reservasjonKRR: hentReservasjonKRR(),
        servicegruppe: hentServicegruppe(),
        formidlingsgruppe: hentFormidlingsgruppe(),
        registreringType: 'INGEN_VERDI',
        geografiskTilknytning: '010302',
    }),

    msw_get(BRUKERINFO_URL, {
        erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver(),
        geografiskTilknytning: hentGeografiskTilknytning(),
        registreringType: hentRegistreringType(),
        rettighetsgruppe: hentRettighetsgruppe(),
        alder: hentAlder(),
    }),

    msw_get(BRUKERREGISTRERING_URL, hentBrukerRegistrering()),

    msw_get(ULESTEDIALOGER_URL, {
        antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0,
    }),

    msw_get(EGENVURDERINGBESVARELSE_URL, hentEgenvurdering()),

    msw_get(MOTESTOTTE_URL, hentMotestotte()),

    msw_get(FEATURE_URL, hentFeatureToggles()),

    msw_get(AUTH_API, hentAutentiseringsInfo()),

    msw_get(UNDER_OPPFOLGING_URL, hentUnderOppfolging()),

    msw_get(NESTE_MELDEKORT_URL, lagMeldekortData()),

    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),

    msw_get(`${DP_INNSYN_URL}/vedtak`, hentDpInnsynVedtak()),
    msw_get(`${DP_INNSYN_URL}/soknad`, hentDpInnsynSoknad()),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, hentDpInnsynPaabegynte()),

    msw_get(GJELDER_FRA_DATO_URL, gjelderFraDatoMock),
    rest.post(GJELDER_FRA_DATO_URL, (req: RestRequest<GjelderFraBody>, res, ctx) => {
        const { dato } = req.body;
        settGjelderFraDato(dato);
        window.location.reload();
        return res(ctx.status(201));
    }),

    msw_get(ARBEIDSSOKERPERIODER_URL, arbeidssokerPerioderResponse),
];
