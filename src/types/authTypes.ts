

export interface RegisterInput {
    email: string;
    password: string;
    role: 'admin' | 'issuer' | 'user';
}


export interface LoginInput {
    email: string;
    password: string;
}


export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    email: string;
    password: string;
    role: 'admin' | 'issuer' | 'user';
}
