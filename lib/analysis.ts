/**
 * this checks if a date given falls within a stipulated week offsetted from the current week
 * @param dateToCheck Date
 * @param weeksOffset Number
 * @returns boolean
 * @example
 * const response = isDateWithinAdjustedWeek(new Date(), 0)
 * the above would check if todays date is within this week
 * 
 * const response = isDateWithinAdjustedWeek(new Date(), -1)
 * the above would check if todays date is within last week
 * 
 * const response = isDateWithinAdjustedWeek(new Date(), 1)
 * the above would check if todays date is within next week
 */
export function isDateWithinAdjustedWeek(
  dateToCheck: Date, weeksOffset: number = 0
): boolean {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const specifiedWeekSundayDate = new Date(currentDate);
  specifiedWeekSundayDate.setDate(specifiedWeekSundayDate.getDate() - currentDay + (weeksOffset * 7));

  const specifiedWeekSaturdayDate = new Date(specifiedWeekSundayDate);
  specifiedWeekSaturdayDate.setDate(specifiedWeekSaturdayDate.getDate() + 6);

  return dateToCheck >= specifiedWeekSundayDate && dateToCheck <= specifiedWeekSaturdayDate;
};


/**
 * This returns the start date and end date of a specific week offsetted by a certain amount from the current week
 * @param weeksOffset number
 * @returns [Date, Date]
 * @example
 * const [currentWeekSunday, currentWeekSaturday] = getWeekLimitDates(0);
 * the above would give the start and end dates for the current week
 * 
 * const [lastWeekSunday, lastWeekSaturday] = getWeekLimitDates(-1);
 * the above would give the start and end dates for last week
 * 
 * const [nextWeekSunday, nextWeekSaturday] = getWeekLimitDates(1);
 * the above would give the start and end dates for next week
 */
export function getWeekLimitDates(
  weeksOffset: number = 0
): [Date, Date] {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const specifiedWeekSundayDate = new Date(currentDate);
  specifiedWeekSundayDate.setDate(specifiedWeekSundayDate.getDate() - currentDay + (weeksOffset * 7));

  const specifiedWeekSaturdayDate = new Date(specifiedWeekSundayDate);
  specifiedWeekSaturdayDate.setDate(specifiedWeekSaturdayDate.getDate() + 6);

  return [specifiedWeekSundayDate, specifiedWeekSaturdayDate];
};


/**
 * Get's the percentage difference between two numbers
 * @param currentAmount number
 * @param previousAmount number
 * @returns 
 */
export function getPercentageChangeDifference(
  currentAmount: number, previousAmount: number
): number {
  if (previousAmount < 1) return 0
  const differenceInPercent = ((currentAmount - previousAmount) / previousAmount) * 100
  return Math.floor(differenceInPercent);
}

