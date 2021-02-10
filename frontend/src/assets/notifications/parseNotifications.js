const WAITER_CALL = 'waiterCall';
const WAITER_CALL_ARCHIVE = 'waiterCallArchive';

function isWaiterCall(notificationInfo) {
  return (
    notificationInfo.NotificationType === WAITER_CALL ||
    notificationInfo.NotificationType === WAITER_CALL_ARCHIVE
  );
}

function HandleWaiterCall(notificationInfo) {
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

export function ParseNotification(notification) {
  const notificationInfo = JSON.parse(notification);

  if (isWaiterCall(notificationInfo)) {
    return HandleWaiterCall(notificationInfo);
  }
  throw {
    code: 500,
    message: `Unknown notification type: ${notificationInfo.NotificationType}`,
  };
}
