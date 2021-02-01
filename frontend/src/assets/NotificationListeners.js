import EventSource from 'eventsource';
import { useDispatch } from 'react-redux';

import { createNotificationListenerAction, deleteNotificationListenerAction } from '~/store/modules/notification/action';

export function CreateNotificationListeners(establishmentToken) {
    const dispatch = useDispatch();
    const url = `http://notifications_service.seuminu.com:6917/Notifications`;
    
    let eventSource = new EventSource(url, {
        withCredentials: false, 
        headers: {
            token: establishmentToken
        }
    });
    
    createListeners(eventSource);
    dispatch(createNotificationListenerAction(eventSource));
}

export function DeleteNotificationListeners(eventSourceObject) {
    const dispatch = useDispatch();
    try {
        eventSourceObject.close();
    } catch (error) {}

    dispatch(deleteNotificationListenerAction());
}

function createListeners(eventSourceObject) {
    try {
        eventSourceObject.onopen = function(event) {
            console.log('--- Opened SSE connection.');
        };
        
        eventSourceObject.onerror = function(event) {
            console.log('--- Got SSE error', event);
        };
        
        eventSourceObject.onmessage = function(event) {
            // event.data will be a JSON string containing the message event.
            console.log(JSON.parse(event.data));
        };
    } catch(error) {}
}