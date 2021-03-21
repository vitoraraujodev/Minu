import api from '~/services/api';

export async function getOpenTableSessions () {
    try {
        await api.get('open-table-sessions');
    } catch (err) {
        alert('Houve um erro ao criar a sessão. Verifique sua conexão e tente novamente.')
    }
}

export async function openTableSession (tableNumber) {
    const payload = {
        tableNumber: tableNumber
    }
    
    try {
        await api.post('open-table-session', payload);
    } catch (err) {
        alert('Houve um erro ao criar a sessão. Verifique sua conexão e tente novamente.')
    }
}
export async function closeTableSession (tableNumber, sessionId) {
    const payload = {
        tableNumber: tableNumber,
        sessionId: sessionId
    }

    try {
        await api.post('close-table-session', payload);
    } catch (err) {
        alert('Houve um erro ao criar a sessão. Verifique sua conexão e tente novamente.')
    }
}