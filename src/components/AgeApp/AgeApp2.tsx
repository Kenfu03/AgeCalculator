import "./AgeApp.css";
import { ChangeEvent, useEffect, useState } from "react";
import waitingSymbol from "./../../assets/images/waiting-symbol.svg";
import { differenceInMonths, differenceInYears } from "date-fns";

interface DatesTypes {
  day?: string;
  month?: string;
  year?: string;
}

interface InputInterface {
  name: string;
  placeHolder: string;
  warning: string;
}

const AgeApp2 = () => {
  const actualDate: Date = new Date();
  const actualDay: number = actualDate.getDate();
  const actualMonth: number = actualDate.getUTCMonth() + 1;
  const actualYear: number = actualDate.getFullYear();
  const [inputDay, setInputDay] = useState<string>("");
  const [inputMonth, setInputMonth] = useState<string>("");
  const [inputYear, setInputYear] = useState<string>("");
  const [maxDays, setMaxDays] = useState<number>(31);
  const [dayWarning, setDayWarning] = useState<string>("");
  const [monthWarning, setMonthWarning] = useState<string>("");
  const [yearWarning, setYearWarning] = useState<string>("");
  const [resultDate, setResultDate] = useState<DatesTypes>({});

  const inputInformation: InputInterface[] = [
    { name: "day", placeHolder: "DD", warning: dayWarning },
    { name: "month", placeHolder: "MM", warning: monthWarning },
    { name: "year", placeHolder: "YYYY", warning: yearWarning },
  ];

  useEffect(() => {
    checkNoEmpty() && results();
  }, [maxDays, inputDay, inputMonth, inputYear]);

  const isLeapYear = (year: number): boolean => {
    return year !== 0 ? (year % 4 === 0 ? true : false) : false;
  };

  const isPair = (number: number): boolean => {
    return number % 2 === 0 ? true : false;
  };

  const setMaxD = (month: number, forInput: boolean): number => {
    if (month === 2) {
      return isLeapYear(forInput ? Number(inputYear) : actualYear) ? 29 : 28;
    }
    return month <= 7 ? (isPair(month) ? 30 : 31) : isPair(month) ? 31 : 30;
  };

  const checkNoEmpty = (): boolean => {
    return inputDay !== "" && inputMonth !== "" && inputYear !== "";
  };

  const dayResult = (): number => {
    const extraMonth = setMaxD(actualMonth - 1, false);
    return Number(inputDay) > actualDay
      ? actualDay + extraMonth - Number(inputDay)
      : actualDay - Number(inputDay);
  };

  const monthResult = (resMonth: number, resYear: number): number => {
    if (Number(inputMonth) === actualMonth) {
      return 0;
    }
    return Number(inputMonth) > actualMonth
      ? resMonth - resYear * 12 + 1
      : resMonth - resYear * 12 + 1;
  };

  const results = (): void => {
    const dateGived: Date = new Date(
      Number(inputYear),
      Number(inputMonth),
      Number(inputDay)
    );
    const resMonth = differenceInMonths(actualDate, dateGived);
    const resYear = differenceInYears(actualDate, dateGived);

    if (maxDays >= Number(inputDay)) {
      warningMessage("dayInput", "");
      setResultDate({
        day: dayResult().toString(),
        month: monthResult(resMonth, resYear).toString(),
        year: resYear.toString(),
      });
    } else {
      warningMessage("dayInput", "Need to be a valid day");
      setInputDay("");
      setResultDate({});
    }
  };

  const warningMessage = (inputName: string, warningMsg: string): void => {
    inputName === "dayInput" && setDayWarning(warningMsg);
    inputName === "monthInput" && setMonthWarning(warningMsg);
    inputName === "yearInput" && setYearWarning(warningMsg);
  };

  const setMaxValue = (evalNumber: number, maxNumber: number): string => {
    if (evalNumber === 0) {
      return "";
    }
    return evalNumber > maxNumber
      ? maxNumber.toString()
      : evalNumber.toString();
  };

  const verifyContent = (inputElement: ChangeEvent<HTMLInputElement>): void => {
    const inputID = inputElement.target.id;
    inputElement.target.value = inputElement.target.value.replace(/\D/g, "");
    const newValue = inputElement.target.value;

    newValue === "" && warningMessage(inputID, "Can`t be empty");
    newValue !== "" && warningMessage(inputID, "");
    setMaxDays(setMaxD(Number(inputMonth), true));

    if (inputID === "dayInput") {
      inputElement.target.value = setMaxValue(Number(newValue), maxDays);
      setInputDay(inputElement.target.value);
    }
    if (inputID === "monthInput") {
      inputElement.target.value = setMaxValue(Number(newValue), 12);
      setInputMonth(inputElement.target.value);
    }
    if (inputID === "yearInput") {
      inputElement.target.value = setMaxValue(Number(newValue), actualYear);
      setInputYear(inputElement.target.value);
    }
  };

  const ResultDiv = () => {
    return (
      <div className="resultDate-container">
        <h1 className="years">
          <p>{resultDate.year ? resultDate.year : "- -"}</p> years
        </h1>
        <h1 className="months">
          <p>{resultDate.month ? resultDate.month : "- -"}</p> months
        </h1>
        <h1 className="days">
          <p>{resultDate.day ? resultDate.day : "- -"}</p> days
        </h1>
      </div>
    );
  };

  const WaitingDiv = () => {
    return (
      <div className="waiting-container">
        <img src={waitingSymbol} alt="waiting" />
        <h1>Waiting for your birthdate</h1>
        <p>Add your birthdate to calculate your age</p>
      </div>
    );
  };

  return (
    <div className="ageApp-container">
      <div className="inputDate-container">
        {inputInformation.map((input: InputInterface, i: number) => (
          <div className={"inputDate-items"} key={i}>
            <p>{input.name}</p>
            <input
              type="text"
              id={input.name + "Input"}
              placeholder={input.placeHolder}
              onChange={(e) => verifyContent(e)}
              maxLength={input.name === "year" ? 4 : 2}
            />
            <p className="warning" id={input.name + "Warning"}>
              {input.warning}
            </p>
          </div>
        ))}
      </div>
      <div className="line"></div>
      {checkNoEmpty() ? <ResultDiv /> : <WaitingDiv />}
    </div>
  );
};

export default AgeApp2;
