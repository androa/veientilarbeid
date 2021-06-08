import { EksperimentId } from './eksperimenter';
import { DinSituasjonSvar } from '../ducks/brukerregistrering';
import { kssSituasjoner } from './is-kss-eksperiment';

export type KontorEksperiment = {
    id: EksperimentId;
    registrertEtterDato?: Date;
    situasjoner?: DinSituasjonSvar[];
};

type Samarbeidskontor = { navn: string; eksperimenter: KontorEksperiment[] };

export const Samarbeidskontorer: { [geografiskTilknytning: string]: Samarbeidskontor } = {
    '030112': {
        navn: 'Alna',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-07'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '030104': {
        navn: 'St. Hanshaugen',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-28'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '030105': {
        navn: 'Frogner',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-28'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '030101': {
        navn: 'Gamle Oslo',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '030108': {
        navn: 'Nordre Aker',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-08'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '3413': {
        navn: 'Stange',
        eksperimenter: [],
    },
    '3407': {
        navn: 'Gjøvik',
        eksperimenter: [],
    },
    '3401': {
        navn: 'Kongsvinger',
        eksperimenter: [],
    },
    '3808': {
        navn: 'Notodden',
        eksperimenter: [],
    },
    '3807': {
        navn: 'Skien',
        eksperimenter: [],
    },
    '4202': {
        navn: 'Grimstad',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-18'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '3803': {
        navn: 'Tønsberg',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-19'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '1120': {
        navn: 'Klepp',
        eksperimenter: [],
    },
    '1121': {
        navn: 'Time',
        eksperimenter: [],
    },
    '110302': {
        navn: 'Tasta',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-13'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '110303': {
        navn: 'Eiganes og Våland',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-13'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '110306': {
        navn: 'Hillevåg',
        eksperimenter: [],
    },
    '110307': {
        navn: 'Hinna',
        eksperimenter: [],
    },
    '030114': {
        navn: 'Nordstrand',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-26'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '3418': {
        navn: 'Åsnes',
        eksperimenter: [],
    },
    '3411': {
        navn: 'Ringsaker',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-20'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '3422': {
        navn: 'Åmot',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-20'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '030109': {
        navn: 'Bjerke',
        eksperimenter: [],
    },
    '1149': {
        navn: 'Karmøy',
        eksperimenter: [],
    },
    '110301': {
        navn: 'Hundvåg',
        eksperimenter: [],
    },
    '3414': {
        navn: 'Nord-Odal',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3415': {
        navn: 'Sør-Odal',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3437': {
        navn: 'Sel',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3446': {
        navn: 'Gran',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3054': {
        navn: 'Lunner',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3419': {
        navn: 'Våler',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
    '3403': {
        navn: 'Hamar',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-06-01'),
                situasjoner: [...kssSituasjoner],
            },
        ],
    },
};
