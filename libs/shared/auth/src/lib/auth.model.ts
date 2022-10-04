export interface jwtResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    jti?: string;
    expires_in: number;//time in millisecconds
    scope?: string;
}