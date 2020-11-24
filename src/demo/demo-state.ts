import { InnloggingsNiva } from '../ducks/autentisering';

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;
interface JSONArray extends Array<JSONValue> {}
type JSONObject = { [member: string]: JSONValue };

export enum DemoData {
    SERVICEGRUPPE = 'servicegruppe',
    FORMIDLINGSGRUPPE = 'formidlingsgruppe',
    SYKMELDT_MED_ARBEIDSGIVER = 'sykmeldtMedArbeidsGiver',
    BRUKER_REGISTRERING = 'brukerRegistrering',
    JSK = 'jsk',
    ULESTE_DIALOGER = 'ulesteDialoger',
    RESERVASJON_KRR = 'reservasjonKRR',
    EGENVURDERING = 'egenvurdering',
    AUTENTISERINGS_INFO = 'autentiseringsInfo',
    MOTESTOTTE = 'motestotte',
    GEOGRAFISK_TILKNYTNING = 'geografiskTilknytning',
    REGISTRERING_TYPE = 'registreringType',
    RETTIGHETSGRUPPE = 'rettighetsgruppe',
    FEATURE_TOGGLES = 'featureToggles',
    UNDER_OPPFOLGING = 'underOppfolging',
}

export const hentFraLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
};

export const settILocalStorage = (key: string, value: string): void => {
    window.localStorage.setItem(key, value);
};

const slettFraLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key);
};

export const hentServicegruppe = (): string => {
    slettFraLocalStorage('innsatsgruppe'); // Rydder opp etter oppdatering av key fra innsatsgruppe til servicegruppe
    return hentFraLocalStorage(DemoData.SERVICEGRUPPE) || 'IKVAL';
};

export const settServicegruppe = (value: string) => {
    slettFraLocalStorage('innsatsgruppe'); // Rydder opp etter oppdatering av key fra innsatsgruppe til servicegruppe
    settILocalStorage(DemoData.SERVICEGRUPPE, value);
};

export const hentFormidlingsgruppe = (): string => {
    return hentFraLocalStorage(DemoData.FORMIDLINGSGRUPPE) || 'ARBS';
};

export const settFormidlingsgruppe = (value: string) => {
    settILocalStorage(DemoData.FORMIDLINGSGRUPPE, value);
};

export const hentRettighetsgruppe = (): string => {
    return hentFraLocalStorage(DemoData.RETTIGHETSGRUPPE) || 'INGEN_VERDI';
};

export const settRettighetsgruppe = (value: string) => {
    settILocalStorage(DemoData.RETTIGHETSGRUPPE, value);
};

export const hentSykmeldtMedArbeidsgiver = (): boolean => {
    return hentFraLocalStorage(DemoData.SYKMELDT_MED_ARBEIDSGIVER) === 'true';
};

export const settSykmeldtMedArbeidsgiver = (value: string) => {
    settILocalStorage(DemoData.SYKMELDT_MED_ARBEIDSGIVER, value);
};

export const hentRegistreringType = (): string => {
    return hentFraLocalStorage(DemoData.REGISTRERING_TYPE) || 'ORDINAER_REGISTRERING';
};

export const settRegistreringType = (value: string) => {
    settILocalStorage(DemoData.REGISTRERING_TYPE, value);
};

export const hentGeografiskTilknytning = (): string => {
    return hentFraLocalStorage(DemoData.GEOGRAFISK_TILKNYTNING) || '0807';
};

export const settGeografiskTilknytning = (value: string) => {
    settILocalStorage(DemoData.GEOGRAFISK_TILKNYTNING, value);
};

export const hentUlesteDialoger = (): boolean => {
    return hentFraLocalStorage(DemoData.ULESTE_DIALOGER) === 'true';
};

export const settUlesteDialoger = (value: string) => {
    settILocalStorage(DemoData.ULESTE_DIALOGER, value);
};

export const hentJsk = (): JSONObject | null => {
    const verdi = hentFraLocalStorage(DemoData.JSK);
    return verdi ? JSON.parse(verdi) : null;
};

export const settJsk = () => {
    settILocalStorage(DemoData.JSK, JSON.stringify({ raad: [] }));
};

export const slettJsk = () => {
    slettFraLocalStorage(DemoData.JSK);
};

export const hentEgenvurdering = (): JSONObject | null => {
    const verdi = hentFraLocalStorage(DemoData.EGENVURDERING);
    return verdi ? JSON.parse(verdi) : null;
};

export const settEgenvurdering = () => {
    settILocalStorage(DemoData.EGENVURDERING, JSON.stringify({ sistOppdatert: '2019-05-12T09:39:01.635+02:00' }));
};

export const slettEgenvurdering = () => {
    slettFraLocalStorage(DemoData.EGENVURDERING);
};

export const hentMotestotte = (): JSONObject | null => {
    const verdi = hentFraLocalStorage(DemoData.MOTESTOTTE);
    return verdi ? JSON.parse(verdi) : null;
};

export const settMotestotte = () => {
    settILocalStorage(DemoData.MOTESTOTTE, JSON.stringify({ dato: '2019-06-06T09:39:01.635+02:00' }));
};

export const slettMotestotte = () => {
    slettFraLocalStorage(DemoData.MOTESTOTTE);
};

const features = (checked: boolean) => ({
    // For tiden ingen feature toggles
});

export const hentFeatureToggles = (): JSONObject => {
    const verdi = hentFraLocalStorage(DemoData.FEATURE_TOGGLES);
    return verdi ? JSON.parse(verdi) : features(true);
};

export const settFeatureToggles = (checked: boolean) => {
    settILocalStorage(DemoData.FEATURE_TOGGLES, JSON.stringify(features(checked)));
};

export const settReservasjonKRR = (value: string) => {
    settILocalStorage(DemoData.RESERVASJON_KRR, value);
};

export const hentReservasjonKRR = (): boolean => {
    return hentFraLocalStorage(DemoData.RESERVASJON_KRR) === 'true';
};

export const settAutentiseringsInfo = () => {
    settILocalStorage(
        DemoData.AUTENTISERINGS_INFO,
        JSON.stringify({
            securityLevel: InnloggingsNiva.LEVEL_3,
            loggedIn: true,
        })
    );
};

export const hentAutentiseringsInfo = (): JSONObject => {
    const verdi = hentFraLocalStorage(DemoData.AUTENTISERINGS_INFO);
    return verdi
        ? JSON.parse(verdi)
        : {
              securityLevel: InnloggingsNiva.LEVEL_4,
              loggedIn: true,
          };
};

export const slettAutentiseringsInfo = () => {
    slettFraLocalStorage(DemoData.AUTENTISERINGS_INFO);
};

export const hentUnderOppfolging = (): JSONObject => {
    const verdi = hentFraLocalStorage(DemoData.UNDER_OPPFOLGING);
    return verdi ? JSON.parse(verdi) : { erBrukerUnderOppfolging: false };
};

export const settUnderOppfolging = () => {
    settILocalStorage(DemoData.UNDER_OPPFOLGING, JSON.stringify({ erBrukerUnderOppfolging: true }));
};

export const slettUnderOppfolging = () => {
    slettFraLocalStorage(DemoData.UNDER_OPPFOLGING);
};
