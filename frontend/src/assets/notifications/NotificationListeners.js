import EventSource from 'eventsource';
import { useDispatch } from 'react-redux';

import {
  createNotificationListenerAction,
  deleteNotificationListenerAction,
} from '~/store/modules/notification/action';
import {
  addOrder,
  receivedOrderArchive,
} from '~/store/modules/dashboard/actions';
import {
  addTableSession,
  receivedTableSessionClose,
} from '~/store/modules/tableSession/actions';

import { ParseNotification } from '~/assets/notifications/parseNotifications';

function isCallNotification(notification) {
  return notification.NotificationType === 'waiterCall' ||
    notification.NotificationType === 'billCall' ||
    notification.NotificationType === 'waiterCallArchive' ||
    notification.NotificationType === 'billCallArchive';
}

function handleCallNotification(notification, dispatch) {
  if (
    notification.NotificationType === 'waiterCall' ||
    notification.NotificationType === 'billCall'
  ) {
    dispatch(addOrder(notification));
  } else if (
    notification.NotificationType === 'waiterCallArchive' ||
    notification.NotificationType === 'billCallArchive'
  ) {
    dispatch(receivedOrderArchive(notification));
  }
}

function isSessionNotification(notification) {
  return notification.NotificationType === 'sessionOpen' ||
    notification.NotificationType === 'sessionClose';
}

function handleSessionNotification(notification, dispatch) {
  if (
    notification.NotificationType === 'sessionOpen') {
    dispatch(addTableSession(notification));
  } else if (
    notification.NotificationType === 'sessionClose'
  ) {
    dispatch(receivedTableSessionClose(notification));
  }
}

function CreateListeners(eventSourceObject) {
  const dispatch = useDispatch();

  let parsedNotification = {};

  eventSourceObject.onopen = function (event) {
    console.log('--- Opened SSE connection.', event);
  };

  eventSourceObject.onerror = function (event) {
    console.log('--- Got SSE error', event);
  };

  eventSourceObject.onmessage = function (event) {
    try {
      parsedNotification = ParseNotification(event.data);
      console.log('Received event: ', parsedNotification.NotificationType);
    } catch (error) {
      console.log(error.message);
    }

    if (isCallNotification(parsedNotification)) {
      handleCallNotification(parsedNotification, dispatch);
    }
    else if (isSessionNotification(parsedNotification)) {
      handleSessionNotification(parsedNotification, dispatch);
    }
  };
}

export function CreateNotificationListeners(establishmentToken) {
  const dispatch = useDispatch();
  const url = `https://backend.seuminu.com:6917`;

  const eventSource = new EventSource(url, {
    withCredentials: false,
    headers: {
      token: establishmentToken,
    },
  });

  CreateListeners(eventSource);
  dispatch(createNotificationListenerAction(eventSource));
}

export function DeleteNotificationListeners(eventSourceObject) {
  const dispatch = useDispatch();
  try {
    eventSourceObject.close();
  } catch (error) {
    console.log('Delete Notifications Error', error);
  }

  dispatch(deleteNotificationListenerAction());
}
