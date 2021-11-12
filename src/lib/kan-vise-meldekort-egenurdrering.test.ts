import { ForeslattInnsatsgruppe } from '../contexts/brukerregistrering';
import { InnloggingsNiva } from '../contexts/autentisering';
import { kanViseEgenvurdering } from './kan-vise-egenvurdering';
import { Formidlingsgruppe, Servicegruppe } from '../contexts/oppfolging';

const grunndata = {
    meldekortData: {
        meldekort: [],
    },
    brukerInfoData: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '110302',
        alder: 42,
        erSykmeldtMedArbeidsgiver: false,
    },
    oppfolgingData: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IVURD,
    },
    registreringData: {
        registrering: {
            opprettetDato: '2020-01-01',
            profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
            besvarelse: null,
        },
    },
    autentiseringData: {
        securityLevel: InnloggingsNiva.LEVEL_4,
        loggedIn: true,
    },
    underOppfolgingData: {
        underOppfolging: true,
    },
};

describe('Tester funksjonen kanViseEgenvurdering', () => {
    test('NEI når brukerregistrering ikke finnes', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering = null;
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('NEI hvis svart at er permitert', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.besvarelse = { dinSituasjon: 'ER_PERMITTERT' };
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er vurdert IVURD', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.servicegruppe = Servicegruppe.BFORM;
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er under oppfølging', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.underOppfolgingData.underOppfolging = false;
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker har reservert seg fra KRR', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.oppfolgingData.reservasjonKRR = true;
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('Nei hvis bruker IKKE er foreslatt innsatsgruppe standard eller situasjonsbestemt eller undefind', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.profilering.innsatsgruppe =
            ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING;
        expect(kanViseEgenvurdering(testdata)).toBe(false);
    });

    test('Ja hvis bruker er foreslatt innsatsgruppe situasjonsbestemt', () => {
        const testdata = JSON.parse(JSON.stringify(grunndata));
        testdata.registreringData.registrering.profilering.innsatsgruppe =
            ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
        expect(kanViseEgenvurdering(testdata)).toBe(true);
    });
});