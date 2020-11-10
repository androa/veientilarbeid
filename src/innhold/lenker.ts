import { contextpathDittNav, erMikrofrontend } from '../utils/app-state-utils';

export const aktivitetsplanLenke = erMikrofrontend() ? `${contextpathDittNav}/aktivitetsplan` : '/aktivitetsplan';
export const alleSkjemaSoknadLenke = 'https://www.nav.no/soknader';
export const dialogLenke = erMikrofrontend() ? `${contextpathDittNav}/dialog` : '/dialog';
export const stillingLenke = erMikrofrontend()
    ? `${contextpathDittNav}/arbeidsplassen/stillinger`
    : '/arbeidsplassen/stillinger';
export const cvLenke = erMikrofrontend() ? `${contextpathDittNav}/arbeidsplassen/cv` : '/arbeidsplassen/cv';
export const veiviserarbeidssokerLenke = erMikrofrontend()
    ? `${contextpathDittNav}/veiviserarbeidssoker`
    : '/veiviserarbeidssoker';
export const jobbsokerkompetanseLenke = erMikrofrontend()
    ? `${contextpathDittNav}/jobbsokerkompetanse/resultatside`
    : '/jobbsokerkompetanse/resultatside';
export const sykefravaerLenke = erMikrofrontend() ? `${contextpathDittNav}/sykefravaer` : '/sykefravaer';
export const dagpengerLesmerLenke = erMikrofrontend()
    ? `${contextpathDittNav}/veiledearbeidssoker/mistet-jobben/dagpenger?sprak=nb`
    : '/veiledearbeidssoker/mistet-jobben/dagpenger?sprak=nb';
export const dagpengerSoknadLenke = 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger';
export const sosialhjelpLenke = erMikrofrontend()
    ? `${contextpathDittNav}/veivisersosialhjelp`
    : '/veivisersosialhjelp';
export const behovsvurderingLenke = erMikrofrontend() ? `${contextpathDittNav}/behovsvurdering` : '/behovsvurdering';
export const motestotteLenke = erMikrofrontend() ? `${contextpathDittNav}/start-samtale` : '/start-samtale';
export const reaktiveringLenke = erMikrofrontend()
    ? `${contextpathDittNav}/arbeidssokerregistrering/start`
    : '/arbeidssokerregistrering/start';
export const sykepengerLenke =
    'https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/Sykepenger+til+arbeidstakere#chapter-7';
export const meldekortLenke = 'https://www.nav.no/meldekort/om-meldekort';
export const aapSoknadLenke =
    'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Arbeid%2C+helse+og+sykdom/arbeidsavklaringspenger';
export const difiLenke = 'https://brukerprofil.difi.no/minprofil/';
