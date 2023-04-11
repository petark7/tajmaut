export const getDateTimeDay = (dateTime) => {
    const UTCDate = new Date (Date.parse(dateTime));
    const CESTDate = new Date(UTCDate.getTime() + (2 * 60 * 60 * 1000));
    const formattedDate = `${CESTDate.getDate().toString().padStart(2, '0')}/${(CESTDate.getMonth() + 1).toString().padStart(2, '0')}/${CESTDate.getFullYear()}`;
    
    const hours =  CESTDate.getHours() < 10 ? `0${CESTDate.getHours()}` : CESTDate.getHours()
    const minutes = CESTDate.getMinutes() < 10 ? `0${CESTDate.getMinutes()}` : CESTDate.getMinutes();
    const time = `${hours}:${minutes}`
    let day = CESTDate.getDay();
    switch (day)
    {
        case 0:
        day = "Недела";
        break;

        case 1:
        day = "Понеделник";
        break;

        case 2:
        day = "Вторник";
        break;

        case 3:
        day = "Среда";
        break;

        case 4:
        day = "Четврток";
        break;

        case 5:
        day = "Петок";
        break;

        case 6:
        day = "Сабота";
        break;
    }

    return {
      date: formattedDate,
      "time": time,
      day: day,
    }
  }