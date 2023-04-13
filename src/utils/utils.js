export const getNextDay = (date) => {
  let nextDay = new Date (date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay.toISOString().substring(0, 10);
}

export const getDateTimeDay = (dateTime = new Date()) => {
  const getDayMKD = (day) => {
    switch (day)
  {
      case 0:
      return "Недела";

      case 1:
      return "Понеделник";

      case 2:
      return "Вторник";

      case 3:
      return "Среда";

      case 4:
      return "Четврток";

      case 5:
      return "Петок";

      case 6:
      return "Сабота";
  }
  }
    const UTCDate = new Date (Date.parse(dateTime));
    const CESTDate = new Date(UTCDate.getTime() + (2 * 60 * 60 * 1000));
    const formattedDate = `${CESTDate.getDate().toString().padStart(2, '0')}/${(CESTDate.getMonth() + 1).toString().padStart(2, '0')}/${CESTDate.getFullYear()}`;
    
    const hours =  CESTDate.getHours() < 10 ? `0${CESTDate.getHours()}` : CESTDate.getHours()
    const minutes = CESTDate.getMinutes() < 10 ? `0${CESTDate.getMinutes()}` : CESTDate.getMinutes();
    const time = `${hours}:${minutes}`

    const dateTomorrow = new Date (CESTDate);
    dateTomorrow.setDate(CESTDate.getDate() + 1);
    const dateInTwoDays = new Date (CESTDate);
    dateInTwoDays.setDate(CESTDate.getDate() + 2)

    const dayToday = getDayMKD(CESTDate.getDay());
    const dayTomorrow = getDayMKD(dateTomorrow.getDay())
    const dayInTwoDays = getDayMKD (dateInTwoDays.getDay())

    return {
      dateTodayISO: CESTDate.toISOString(),
      dateTomorrowISO: dateTomorrow.toISOString(),
      dateInTwoDaysISO: dateInTwoDays.toISOString(),
      date: formattedDate,
      time,
      dayToday,
      dayTomorrow,
      dayInTwoDays,
      dateTomorrow,
      dateInTwoDays,
    }
  }