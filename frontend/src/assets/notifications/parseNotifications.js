const WAITER_CALL = 'waiterCall';
const WAITER_CALL_ARCHIVE = 'waiterCallArchive';

const BILL_CALL = 'billCall';
const BILL_CALL_ARCHIVE = 'billCallArchive';

const SESSION_OPEN = 'sessionOpen';
const SESSION_CLOSE = 'sessionClose';


function isWaiterCall(notificationInfo) {
  return (
    notificationInfo.NotificationType === WAITER_CALL ||
    notificationInfo.NotificationType === WAITER_CALL_ARCHIVE
  );
}

function handleWaiterCall(notificationInfo) {
  delete notificationInfo._kafka;

  notificationInfo.TableNumber = parseInt(notificationInfo.TableNumber, 10);
  if (notificationInfo.NotificationType === WAITER_CALL_ARCHIVE) {
    notificationInfo.WaiterCallTimestamp = parseInt(
      notificationInfo.WaiterCallTimestamp,
      10
    );
  }
  return notificationInfo;
}

function isBillCall(notificationInfo) {
  return (
    notificationInfo.NotificationType === BILL_CALL ||
    notificationInfo.NotificationType === BILL_CALL_ARCHIVE
  );
}

function handleBillCall(notificationInfo) {
  delete notificationInfo._kafka;

  notificationInfo.TableNumber = parseInt(notificationInfo.TableNumber, 10);
  if (notificationInfo.NotificationType === BILL_CALL_ARCHIVE) {
    notificationInfo.BillCallTimestamp = parseInt(
      notificationInfo.BillCallTimestamp,
      10
    );
  }
  return notificationInfo;
}

function isSessionNotification(notificationInfo) {
  return (
    notificationInfo.NotificationType === SESSION_OPEN ||
    notificationInfo.NotificationType === SESSION_CLOSE
  );
}

function handleSessionNotification(notificationInfo) {
  delete notificationInfo._kafka;
  return notificationInfo;
}

export function ParseNotification(notification) {
  const notificationInfo = JSON.parse(notification);

  if (isWaiterCall(notificationInfo)) {
    return handleWaiterCall(notificationInfo);
  }

  if (isBillCall(notificationInfo)) {
    return handleBillCall(notificationInfo);
  }

  if(isSessionNotification(notificationInfo)) {
    return handleSessionNotification(notificationInfo);
  }

  throw {
    code: 500,
    message: `Unknown notification type: ${notificationInfo.NotificationType}`,
  };
}
