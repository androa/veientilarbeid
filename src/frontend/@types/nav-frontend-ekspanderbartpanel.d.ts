/// <reference types="react" />
import * as React from 'react';
import 'nav-frontend-ekspanderbartpanel-style';
/**
 * Self-contained 'StortEkspanderbartpanel'.
 * Denne komponenten holder selv styr på om innholdet skal vises eller ikke.
 */
export interface EkspanderbartpanelProps {
    /**
     * Skal komponenten være 'default' åpen
     */
    apen?: boolean;
    /**
     * Callback funksjon for når knappen blir klikket på
     */
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    tittelProps: string;
}
export interface EkspanderbartpanelState {
    apen: boolean;
}
declare class Ekspanderbartpanel extends React.Component<EkspanderbartpanelProps, EkspanderbartpanelState> {
    static defaultProps: Partial<EkspanderbartpanelProps>;
    constructor(props: any);
    handleClick(event: React.SyntheticEvent<HTMLButtonElement>): void;
    render(): JSX.Element;
}
export default Ekspanderbartpanel;
export { default as EkspanderbartpanelPure } from './ekspanderbartpanel-pure';
export { default as EkspanderbartpanelBase } from './ekspanderbartpanel-base';
export { default as EkspanderbartpanelBasePure } from './ekspanderbartpanel-base-pure';
