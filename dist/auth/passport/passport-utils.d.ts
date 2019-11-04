export declare type User = {
    email: string;
    givenName: string;
    familyName: string;
    pictureUrl: string;
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expirationInSeconds: number;
};
export declare type GoogleUserInfo = {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
    idToken: string;
    exp: number;
};
export declare type GoogleAuthConfig = {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
};
export declare const extractUser: (accessToken: string, refreshToken: string, info: GoogleUserInfo) => User;
export declare const extractGoogleInfo: (user: User) => GoogleUserInfo;
