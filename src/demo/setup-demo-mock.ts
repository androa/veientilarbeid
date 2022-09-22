import { rest } from 'msw';

import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    FEATURE_URL,
    MELDEKORTSTATUS_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    VEILARBOPPFOLGING_URL,
    DP_INNSYN_URL,
    GJELDER_FRA_DATO_URL,
    AUTH_API,
    ARBEIDSSOKERPERIODER_URL,
    PROFIL_URL,
    ARBEIDSSOKER_NIVA3_URL,
    ER_STANDARD_INNSATSGRUPPE_URL,
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
    hentStandardInnsatsgruppe,
} from './demo-state';

import { hentBrukerRegistrering } from './demo-state-brukerregistrering';
import msw_get from '../mocks/msw-utils';
import meldekortstatusResponse from '../mocks/meldekortstatus-mock';
import { gjelderFraGetResolver, gjelderFraPostResolver } from './demo-state-gjelderfra';
import { brukerProfilGetResolver, brukerProfilPostResolver } from './demo-state-profil';
import arbeidssokerPerioderResponse from '../mocks/arbeidssoker-perioder-mock';
import arbeidssokerNiva3Response, { ArbeidssokerPeriode } from '../mocks/arbeidssoker-niva3-mock';

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

    msw_get(NESTE_MELDEKORT_URL, lagMeldekortData()),
    //rest.get(NESTE_MELDEKORT_URL, async (req, res, ctx) => {
    //    return res(ctx.status(401));
    //}),

    msw_get(MELDEKORTSTATUS_URL, meldekortstatusResponse),
    //rest.get(MELDEKORTSTATUS_URL, async (req, res, ctx) => {
    //    return res(ctx.status(401));
    //}),

    msw_get(`${DP_INNSYN_URL}/vedtak`, hentDpInnsynVedtak()),
    msw_get(`${DP_INNSYN_URL}/soknad`, hentDpInnsynSoknad()),
    msw_get(`${DP_INNSYN_URL}/paabegynte`, hentDpInnsynPaabegynte()),

    rest.get(GJELDER_FRA_DATO_URL, gjelderFraGetResolver),
    rest.post(GJELDER_FRA_DATO_URL, gjelderFraPostResolver),

    msw_get(ARBEIDSSOKERPERIODER_URL, arbeidssokerPerioderResponse),

    rest.get(PROFIL_URL, brukerProfilGetResolver),
    rest.post(PROFIL_URL, brukerProfilPostResolver),

    rest.get(ARBEIDSSOKER_NIVA3_URL, (req, res, ctx) => {
        // eslint-disable-next-line no-restricted-globals
        const searchParams = new URLSearchParams(location.search);
        const { underOppfolging } = hentUnderOppfolging();

        return res(
            ctx.json(
                arbeidssokerNiva3Response(
                    underOppfolging,
                    searchParams.get('arbeidssokerPeriode') as ArbeidssokerPeriode
                )
            )
        );
    }),

    msw_get(ER_STANDARD_INNSATSGRUPPE_URL, hentStandardInnsatsgruppe().standardInnsatsgruppe),
];
