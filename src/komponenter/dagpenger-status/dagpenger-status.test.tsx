import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DagpengerStatus from './dagpenger-status';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const providerProps: ProviderProps = {
    brukerInfo: {
        geografiskTilknytning: '110302',
        alder: 42,
    },
    amplitude: {
        ukerRegistrert: 2,
        gruppe: 'kss',
        eksperimenter: ['onboarding14a'],
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
};

describe('Tester dagpengerkomponenten', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten rendres IKKE default', () => {
        const { container } = render(<DagpengerStatus />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE når featuretoggle ikke er togglet på', () => {
        const { container } = render(<DagpengerStatus />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres når featuretoggle er togglet på', () => {
        const { container } = render(<DagpengerStatus />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.dagpenger-status': true },
            }),
        });

        expect(container).not.toBeEmptyDOMElement();
    });
});