export function addTableSessions(tableSessions) {
  return {
    type: '@tableSession/ADD_TABLE_SESSIONS',
    payload: tableSessions,
  };
}

export function addTableSession(tableSession) {
  return {
    type: '@tableSession/ADD_TABLE_SESSION',
    payload: tableSession,
  };
}

export function removeTableSessionRequest(tableSession) {
  return {
    type: '@tableSession/REMOVE_TABLE_SESSION_REQUEST',
    payload: tableSession,
  };
}

export function removeTableSessionSuccess(tableSession) {
  return {
    type: '@tableSession/REMOVE_TABLE_SESSION_SUCCESS',
    payload: tableSession,
  };
}

export function removeTableSessionFailure(tableSession) {
  return {
    type: '@tableSession/REMOVE_TABLE_SESSION_FAILURE',
    payload: tableSession,
  };
}
