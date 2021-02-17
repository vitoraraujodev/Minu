export function addOrder(order) {
  return {
    type: '@dashboard/ADD_ORDER',
    payload: order,
  };
}

export function archiveOrderRequest(order) {
  return {
    type: '@dashboard/ARCHIVE_ORDER_REQUEST',
    payload: order,
  };
}

export function archiveOrderSuccess(order) {
  return {
    type: '@dashboard/ARCHIVE_ORDER_SUCCESS',
    payload: order,
  };
}

export function archiveOrderFailure(order) {
  return {
    type: '@dashboard/ARCHIVE_ORDER_FAILURE',
    payload: order,
  };
}

export function receivedOrderArchive(order) {
  return {
    type: '@dashboard/RECEIVED_ORDER_ARCHIVE',
    payload: order,
  };
}

export function addOpenCalls(openCalls) {
  return {
    type: '@dashboard/ADD_OPEN_CALLS',
    payload: openCalls,
  };
}
