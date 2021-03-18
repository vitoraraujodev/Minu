import { getHours, getDay } from 'date-fns';

export function handleEndAt(endAt) {
  const result = endAt + 1;
  return result === 1 ? 24 : result;
}

export function handleActiveMenus(menus, date) {
  const weekDay = getDay(date);

  const activeMenus = menus.filter((menu) => {
    if (menu.start_at > handleEndAt(menu.end_at)) {
      return (
        (getHours(date) >= menu.start_at &&
          getHours(date) < 24 &&
          menu.availability[weekDay] === '1') ||
        (getHours(date) >= 0 &&
          getHours(date) <= handleEndAt(menu.end_at) &&
          menu.availability[weekDay - 1] === '1')
      );
    }
    return (
      getHours(date) >= menu.start_at &&
      getHours(date) < handleEndAt(menu.end_at) &&
      menu.availability[weekDay] === '1'
    );
  });

  return activeMenus;
}
