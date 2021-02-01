import { useDispatch } from 'react-redux';
import { createDashboardOrderAction } from '~/store/modules/dashboard/actions';

export function ParseNotification(notification) {
    var notificationInfo = JSON.parse(notification)
    console.log(notificationInfo);

    if (isWaiterCall(notificationInfo)) {
        return HandleWaiterCall(notificationInfo);
    }
    else {
        throw {message: `Unknown notification type: ${notificationInfo.NotificationType}`}
    }
}

function isWaiterCall(notificationInfo){
    return notificationInfo.NotificationType === 'waiterCall';
}

function HandleWaiterCall(notificationInfo) {
    notificationInfo.Timestamp = notificationInfo._kafka.timestamp;
    delete notificationInfo._kafka;
    return notificationInfo;
}