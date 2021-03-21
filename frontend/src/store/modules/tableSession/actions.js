export function addTableSession(sessionOpen) {
  return {
    type: '@tableSession/ADD_TABLE_SESSION',
    payload: sessionOpen,
  };
}

export function receivedTableSessionClose(sessionClose) {
  return {
    type: '@tableSession/RECEIVED_CLOSE_TABLE_SESSION',
    payload: sessionClose,
  };
}