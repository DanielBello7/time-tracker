import Decimal from "decimal.js";
const periods = ["seconds", "minutes", "hours"] as const;

export default function maxPeriodCalculator(
    startDate: Date, endDate: Date, period: typeof periods[number]
): number {
    const beginDate = new Decimal(new Date(startDate).getTime());
    const finishDate = new Decimal(new Date(endDate).getTime());

    if (finishDate.lessThan(beginDate)) {
        throw new Error("invalid arguments: finishDate, beginDate");
    }

    const difference = finishDate.minus(beginDate);
    let result: Decimal;

    switch (period) {
        case "hours":
            result = difference.dividedBy(3600000)
            break;
        case "minutes":
            result = difference.dividedBy(60000);
            break;
        case "seconds":
            result = difference.dividedBy(1000);
            break;
        default:
            throw new Error("invaid arguments: period")
    }
    return result.toDecimalPlaces(2).toNumber();
}

