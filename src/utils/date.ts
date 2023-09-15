export function getTodayDate(type?: string) {
  const myDate = new Date();
  const myYear = myDate.getFullYear();
  let myMonth = (myDate.getMonth() + 1).toString();
  let myToday = myDate.getDate().toString(); //获取当前日(1-31)

  if (type === 'ch') {
    return myYear + '年' + myMonth + '月' + myToday + '日';
  }
  if (Number(myMonth) < 10) {
    myMonth = '0' + myMonth;
  }
  if (Number(myToday) < 10) {
    myToday = '0' + myToday;
  }

  return myYear + '-' + myMonth + '-' + myToday;
}
// 日期 2022-1-2 转为 2022年1月2日 参数：type：year；month;day
export function dateToName(date: string, type?: string) {
  type = type || 'day';
  const dateArr = date.split('-');
  switch (type) {
    case 'year':
      return dateArr[0] + '年';
    case 'month':
      return dateArr[0] + '年' + dateArr[1] + '月';
    case 'day':
      return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
  }
}
