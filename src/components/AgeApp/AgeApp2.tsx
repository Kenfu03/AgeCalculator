import "./AgeApp.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import waitingSymbol from "./../../assets/images/waiting-symbol.svg";
import { differenceInYears } from "date-fns";

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
  const date: Date = new Date();
  const actualDay: number = date.getDate();
  const actualMonth: number = date.getUTCMonth() + 1;
  const actualYear: number = date.getFullYear();
  const [inputDay, setInputDay] = useState<string>("");
  const [inputMonth, setInputMonth] = useState<string>("");
  const [inputYear, setInputYear] = useState<string>("");
  const [maxDays, setMaxDays] = useState<number>(31);
  const [dayWarning, setDayWarning] = useState<string>("");
  const [monthWarning, setMonthWarning] = useState<string>("");
  const [yearWarning, setYearWarning] = useState<string>("");
  const [resultDate, setResultDate] = useState<DatesTypes>({});
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("cambio algo");
    results();
  }, [inputDay, inputMonth, inputYear, maxDays]);

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
    if (Number(inputDay) > actualDay) {
      return actualDay + setMaxD(actualMonth - 1, false) - Number(inputDay);
    } else {
      return actualDay - Number(inputDay);
    }
  };

  const monthResult = (): number => {
    let extraYear: number = 0;
    Number(inputMonth) > actualMonth ? (extraYear = 12) : (extraYear = 0);

    if (Number(inputMonth) === actualMonth) {
      return 0;
    }
    return Number(inputDay) > actualDay
      ? actualMonth + extraYear - (Number(inputMonth) + 1)
      : actualMonth + extraYear - Number(inputMonth);
  };

  const results = (): void => {
    const actualDate: Date = new Date(actualYear, actualMonth, actualDay);
    const dateGived: Date = new Date(
      Number(inputYear),
      Number(inputMonth),
      Number(inputDay)
    );
    if (checkNoEmpty() && maxDays >= Number(inputDay)) {
      warningMessage("dayInput", "");
      setResultDate({
        day: dayResult().toString(),
        month: monthResult().toString(),
        year: differenceInYears(actualDate, dateGived).toString(),
      });
    } else {
      if (maxDays < Number(inputDay)) {
        warningMessage("day", "Need to be a valid day");
      }
      setResultDate({});
    }
  };

  const warningMessage = (inputName: string, warningMsg: string): void => {
    inputName === "day" && setDayWarning(warningMsg);
    inputName === "month" && setMonthWarning(warningMsg);
    inputName === "year" && setYearWarning(warningMsg);
  };

  const setMaxValue = (evalNumber: number, maxNumber: number): string => {
    return evalNumber > maxNumber
      ? maxNumber.toString()
      : evalNumber.toString();
  };

  const verifyContent = (inputElement: ChangeEvent<HTMLInputElement>): void => {
    const inputName = inputElement.target.id;
    let newValue = inputElement.target.value;
    newValue = newValue.replace(/\D/g, "");

    // inputElement.value === "" && warningMessage(inputName, "Can`t be empty");
    // inputElement.value !== "" && warningMessage(inputName, "");
    // setMaxDays(setMaxD(Number(inputMonth), true));

    if (inputName === "dayInput") {
      newValue = setMaxValue(Number(newValue), maxDays);
      setInputDay(newValue);
    }
    if (inputName === "monthInput") {
      newValue = setMaxValue(Number(newValue), 12);
      setInputMonth(newValue);
    }
    if (inputName === "yearInput") {
      newValue = setMaxValue(Number(newValue), actualYear);
      setInputYear(newValue);
    }
  };

  const InputDate = (props: InputInterface) => {
    return (
      <div className={"inputDate-items"}>
        <p>{props.name}</p>
        <input
          type="text"
          id={props.name + "Input"}
          placeholder={props.placeHolder}
          onChange={(e) => verifyContent(e)}
          maxLength={props.name === "year" ? 4 : 2}
        />
        <p className="warning" id={props.name + "Warning"}>
          {props.warning}
        </p>
      </div>
    );
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
        <InputDate name="day" placeHolder="DD" warning={dayWarning} />
        <InputDate name="month" placeHolder="MM" warning={monthWarning} />
        <InputDate name="year" placeHolder="YYYY" warning={yearWarning} />
      </div>
      <div className="line"></div>
      <ResultDiv />
      {/* {checkNoEmpty() ? <ResultDiv /> : <WaitingDiv />} */}
    </div>
  );
};

export default AgeApp2;
