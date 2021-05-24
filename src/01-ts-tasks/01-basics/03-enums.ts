export enum WeekDay {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday'
}

// TODO: https://en.wikipedia.org/wiki/ISO/IEC_5218
export enum Sex {
  NOT_KNOWN = 'not-known',
  MALE = 'male',
  FEMALE = 'female',
  NOT_APPLICABLE = 'not-applicable'
}

export function enumsApp() {
  let day: WeekDay = WeekDay.SATURDAY;
  console.log("day:", day, WeekDay);

  let sex: Sex = Sex.FEMALE;
  console.log("sex:", sex, Sex);
}
