import * as React from 'react';
import { DataElement, STATUS } from './api';

export enum alleFeatureToggles {
    INTRO_FEEDBACK = 'veientilarbeid.feedback',
    INTRO_14A = 'veientilarbeid.14a-intro',
}

export function prettyPrintFeatureToggle(toggle: alleFeatureToggles) {
    switch (toggle) {
        case alleFeatureToggles.INTRO_14A:
            return '14a-intro';
        case alleFeatureToggles.INTRO_FEEDBACK:
            return 'Intro feedback';
    }
}

export interface Data {
    'veientilarbeid.feedback': boolean;
    'veientilarbeid.14a-intro': boolean;
}

export interface State extends DataElement {
    data: Data;
}

export const initialState: State = {
    data: {
        'veientilarbeid.feedback': false,
        'veientilarbeid.14a-intro': false,
    },
    status: STATUS.NOT_STARTED,
};

export const FeaturetoggleContext = React.createContext<State>(initialState);
