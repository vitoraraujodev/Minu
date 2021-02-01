export function createDashboardOrderAction(dashboardOrderInfo) {
    return {
      type: '@dashboard/ADD_ORDER',
      payload: dashboardOrderInfo,
    };
}

export function deleteDashboardOrderAction(dashboardOrderInfo) {
    return {
      type: '@dashboard/DELETE_ORDER',
      payload: dashboardOrderInfo,
    };
}