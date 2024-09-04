import { login, register } from "./http";

export async function signUp(email, password) {
    const response = await register(email, password);

    return response;
}

export async function signIn(email, password) {
    const response = await login(email, password);

    return response;
}