export function addTableSession(tableSession) {
  return {
    type: '@tableSession/ADD_TABLE_SESSION',
    payload: tableSession,
  };
}

export function removeTableSession(tableSession) {
  return {
    type: '@tableSession/REMOVE_TABLE_SESSION',
    payload: tableSession,
  };
}
