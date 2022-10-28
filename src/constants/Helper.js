export function dateFormatId(date) {
  // list month in Indonesia
  const monthId = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  var date = new Date(date);
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  var dateId = day + " " + monthId[month] + " " + year;
  return dateId;
}
export function DateFormatPengajuan(date) {
  let dateId = DateMysql(date);
  // list day in Indonesia
  const dayId = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  var day = dateId.getDay();

  return dayId[day] + ", " + dateFormatId(date.split(" ")[0]);
}
export function JsonToArray(json) {
  let array = [];
  for (let key in json) {
    array.push(json[key]);
  }
  return array;
}
export function DateMysql(date) {
  const dateTime = date;

  let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
  dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

  const dateObject = new Date(...dateTimeParts);
  return dateObject;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function dataToString(data) {
  if (data === null) {
    return "";
  }
  return capitalizeFirstLetter(data.replace(/_/g, " "));
}
