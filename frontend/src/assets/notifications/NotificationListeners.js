import EventSource from 'eventsource';
import { useDispatch } from 'react-redux';

import {
  createNotificationListenerAction,
  deleteNotificationListenerAction,
} from '~/store/modules/notification/action';
import {
  createDashboardOrderAction,
  receivedDashboardOrderArchiveAction,
} from '~/store/modules/dashboard/actions';

import { ParseNotification } from '~/assets/notifications/parseNotifications';

function CreateListeners(eventSourceObject) {
  const dispatch = useDispatch();

  try {
    eventSourceObject.onopen = function (event) {
      console.log('--- Opened SSE connection.', event);
    };

    eventSourceObject.onerror = function (event) {
      console.log('--- Got SSE error', event);
    };

    eventSourceObject.onmessage = function (event) {
      try {
        var parsedNotification = ParseNotification(event.data);
      } catch (error) {
        console.log(error.message);
      }

      if (parsedNotification.NotificationType === 'waiterCall') {
        dispatch(createDashboardOrderAction(parsedNotification));
      } else if (parsedNotification.NotificationType === 'waiterCallArchive') {
        dispatch(receivedDashboardOrderArchiveAction(parsedNotification));
      }
    };
  } catch (error) {}
}

export function CreateNotificationListeners(establishmentToken) {
  const dispatch = useDispatch();
  const url = `http://notifications_service.seuminu.com:6917/Notifications`;

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
  } catch (error) {}

  dispatch(deleteNotificationListenerAction());
}
