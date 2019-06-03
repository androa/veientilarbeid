import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { fetchToJson } from '../../ducks/api-utils';
import { DataElement, requestConfig, STATUS } from '../../ducks/api';
import { contextpathDittNav, erMikrofrontend } from '../../utils/app-state-utils';
import SjekkOppfolging from './sjekk-oppfolging';
import DataProvider from './data-provider';
import InnholdLogikkNiva4 from '../../innhold/innhold-logikk-niva4';
import InnholdLogikkNiva3 from '../../innhold/innhold-logikk-niva3';
import OppfolgingBrukerregistreringProvider from './oppfolging-brukerregistrering-provider';

export const AUTH_API = '/api/auth';

export enum InnloggingsNiva {
    LEVEL_1 = 'Level1',
    LEVEL_2 = 'Level2',
    LEVEL_3 = 'Level3',
    LEVEL_4 = 'Level4',
    UKJENT = 'Ukjent',
}

const initialState: InnloggingsInfo = {
    data: {
        isLoggedIn: false,
        securityLevel: InnloggingsNiva.UKJENT,
    },
    status: STATUS.NOT_STARTED,
};

export interface Data {
    isLoggedIn: boolean;
    securityLevel: string;
}

export interface InnloggingsInfo extends DataElement {
    data: Data;
}

const AutentiseringsInfoFetcher = () => {

    const [state, setState] = React.useState(initialState);

    const contextpath = erMikrofrontend() ? contextpathDittNav : '';

    React.useEffect(() => {
        setState({...state, status: STATUS.PENDING});
        const fetchAsync = async () => {
            const data = await fetchToJson<Data>(`${contextpath}${AUTH_API}`, requestConfig);
            setState({data: data, status: STATUS.OK});
        };
        fetchAsync().catch(err => {
            setState({...state, status: STATUS.ERROR});
            return Promise.reject(err);
        })

    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={[state]}
        >
            {state.data.securityLevel === InnloggingsNiva.LEVEL_3
                ? <InnholdLogikkNiva3/>
                : <OppfolgingBrukerregistreringProvider>
                    <SjekkOppfolging>
                        <DataProvider>
                            <InnholdLogikkNiva4/>
                        </DataProvider>
                    </SjekkOppfolging>
                </OppfolgingBrukerregistreringProvider>
            }
        </Innholdslaster>
    );
};

export default AutentiseringsInfoFetcher;