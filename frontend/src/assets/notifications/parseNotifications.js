var WAITER_CALL = 'waiterCall'
var WAITER_CALL_ARCHIVE = 'waiterCallArchive'

export function ParseNotification(notification) {
    var notificationInfo = JSON.parse(notification)

    if (isWaiterCall(notificationInfo)) {
        return HandleWaiterCall(notificationInfo);
    } else {
        throw {code: 500, message: `Unknown notification type: ${notificationInfo.NotificationType}`}
    }
}

function isWaiterCall(notificationInfo){
    return (notificationInfo.NotificationType === WAITER_CALL || 
    notificationInfo.NotificationType === WAITER_CALL_ARCHIVE );
}

function HandleWaiterCall(notificationInfo) {
    delete notificationInfo._kafka;

    notificationInfo.TableNumber = parseInt(notificationInfo.TableNumber); 
    if (notificationInfo.NotificationType === WAITER_CALL_ARCHIVE) {
        notificationInfo.WaiterCallTimestamp = parseInt(notificationInfo.WaiterCallTimestamp); 
    }
    return notificationInfo;
}