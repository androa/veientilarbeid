import {
    FEATURE_URL,
    JOBBSOKERBESVARELSE_URL,
    SERVICEGRUPPE_URL,
    STARTREGISTRERING_URL,
    BRUKERREGISTRERING_URL,
    VEILARBOPPFOLGING_URL,
    ULESTEDIALOGER_URL,
    EGENVURDERINGBESVARELSE_URL,
    featureQueryParams
} from '../ducks/api';
import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import {
    hentJsk, hentReservasjonKRR,
    hentServicegruppe,
    hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger, hentEgenvurdering
} from './demo-state';
import { hentBrukerRegistreringData } from './demo-state-brukerregistrering';

const loggingMiddleware: Middleware = (request, response) => {
    console.log(request.url, request.method, response); // tslint:disable-line:no-console
    return response;
};

const fetchMock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.00),
        loggingMiddleware,
    ),
});

const randomUlesteDialoger = () => {
    const min = 1;
    const max = 99;
    return Math.floor(min + (Math.random() * (max - min)));
};

fetchMock.get(VEILARBOPPFOLGING_URL, {
    underOppfolging: true,
    kanReaktiveres: false,
    reservasjonKRR: hentReservasjonKRR(),
});

fetchMock.get(SERVICEGRUPPE_URL, {
    servicegruppe: hentServicegruppe()
});

fetchMock.get(STARTREGISTRERING_URL, {
    erSykmeldtMedArbeidsgiver: hentSykmeldtMedArbeidsgiver()
});

fetchMock.get(BRUKERREGISTRERING_URL, hentBrukerRegistreringData());

fetchMock.get(ULESTEDIALOGER_URL, {
    antallUleste: hentUlesteDialoger() ? randomUlesteDialoger() : 0
});

fetchMock.get(JOBBSOKERBESVARELSE_URL, hentJsk());

fetchMock.get(EGENVURDERINGBESVARELSE_URL, hentEgenvurdering());

const unleashUrl = FEATURE_URL + featureQueryParams([]);
fetchMock.get(unleashUrl, {});
