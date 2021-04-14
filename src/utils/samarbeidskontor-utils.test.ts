import {
    erSamarbeidskontor,
    hentEksperimenterFraSamarbeidskontor,
    KontorBrukerContext,
} from './samarbeidskontor-utils';
import { EksperimentId } from '../lib/eksperimenter';

describe('tester funksjonaliteten for visEksperiment', () => {
    function visEksperiment(eksperiementId: EksperimentId, brukerContext: KontorBrukerContext) {
        return hentEksperimenterFraSamarbeidskontor(brukerContext).includes(eksperiementId);
    }

    test('returnerer true for Tasta og onboarding14a', () => {
        expect(
            visEksperiment('onboarding14a', {
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-14'),
            })
        ).toBe(true);
    });

    test('returnerer true for Tasta og onboarding14a når man er registrert samme dag', () => {
        expect(
            visEksperiment('onboarding14a', {
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-13'),
            })
        ).toBe(true);
    });

    test('returnerer false for Tasta og onboarding14a når man er registrert dagen før eksperimentet', () => {
        expect(
            visEksperiment('onboarding14a', {
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-12'),
            })
        ).toBe(false);
    });

    test('returnerer false for Notodden og dummyEksperiment', () => {
        expect(
            visEksperiment('dummyEksperiment', {
                geografiskTilknytning: '3808',
            })
        ).toBe(false);
    });

    test('returnerer false for Færder og onboarding14a', () => {
        expect(
            visEksperiment('onboarding14a', {
                geografiskTilknytning: '3811',
                registreringsDato: new Date('2021-04-13'),
            })
        ).toBe(false);
    });

    test('returnerer false for manglende geografiskTilknytning', () => {
        expect(visEksperiment('onboarding14a', {})).toBe(false);
    });
});

describe('tester funksjonaliteten for erSamarbeidskontor', () => {
    test('returnerer true for Notodden', () => {
        expect(erSamarbeidskontor('3808')).toBe(true);
    });
    test('returnerer false for Færder', () => {
        expect(erSamarbeidskontor('3811')).toBe(false);
    });
    test('returnerer false for manglende geografiskTilknytning', () => {
        expect(erSamarbeidskontor(undefined)).toBe(false);
    });
});

describe('tester funksjonaliteten for hentEksperimenterFraSamarbeidskontor', () => {
    test('returnerer riktig liste for samarbeidskontoret Tasta', () => {
        expect(
            hentEksperimenterFraSamarbeidskontor({
                geografiskTilknytning: '110302',
                registreringsDato: new Date('2021-04-13'),
            })
        ).toStrictEqual(['onboarding14a']);
    });
    test('returnerer tom liste for ikke-samarbeidskontoret Færder', () => {
        expect(
            hentEksperimenterFraSamarbeidskontor({
                geografiskTilknytning: '3811',
                registreringsDato: new Date('2021-04-13'),
            })
        ).toStrictEqual([]);
    });

    test('returnerer tom liste for manglende geografiskTilknytning', () => {
        expect(hentEksperimenterFraSamarbeidskontor({})).toStrictEqual([]);
    });
});
