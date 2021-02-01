import EventSource from 'eventsource';
import { useDispatch } from 'react-redux';

import { createNotificationListenerAction, deleteNotificationListenerAction } from '~/store/modules/notification/action';
import { createDashboardOrderAction } from '~/store/modules/dashboard/actions';

import { ParseNotification } from '~/assets/notifications/parseNotifications';

export function CreateNotificationListeners(establishmentToken) {
    const dispatch = useDispatch();
    const url = `http://notifications_service.seuminu.com:6917/Notifications`;
    
    let eventSource = new EventSource(url, {
        withCredentials: false, 
        headers: {
            token: establishmentToken
        }
    });
    
    CreateListeners(eventSource);
    dispatch(createNotificationListenerAction(eventSource));
}

export function DeleteNotificationListeners(eventSourceObject) {
    const dispatch = useDispatch();
    try {
        eventSourceObject.close();
    } catch (error) {}

    dispatch(deleteNotificationListenerAction());
}

function CreateListeners(eventSourceObject) {
    const dispatch = useDispatch();

    try {
        eventSourceObject.onopen = function(event) {
            console.log('--- Opened SSE connection.');
        };
        
        eventSourceObject.onerror = function(event) {
            console.log('--- Got SSE error', event);
        };
        
        eventSourceObject.onmessage = function(event) {
            try {
                var parsedNotification = ParseNotification(event.data)
            } catch (error) {
                console.log(error.message)
            }

            dispatch(createDashboardOrderAction(parsedNotification));
        };
    } catch(error) {}
}