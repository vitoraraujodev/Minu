export function createNotificationListenerAction(eventSourceObject) {
    return {
      type: '@notification/CREATE_NOTIFICATION_OBJECT',
      payload: eventSourceObject,
    };
  }

  export function deleteNotificationListenerAction() {
    return {
      type: '@notification/DELETE_NOTIFICATION_OBJECT',
    };
  }