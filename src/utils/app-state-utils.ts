export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}

export const erMikrofrontend = () => process.env.REACT_APP_MICRO;

export const erMock = () => process.env.REACT_APP_MOCK;