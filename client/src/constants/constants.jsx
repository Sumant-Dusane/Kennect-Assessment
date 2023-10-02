export const endpoint = 'https://kennect-social-backend.onrender.com/api/v1/';

export function getCurrentUser() {
    return localStorage.getItem('curUser')
}

export function setCurrentUser(userId) {
    return localStorage.setItem('curUser', userId);
}

export function removeCurrentUser(){
    return localStorage.removeItem('curUser');
}