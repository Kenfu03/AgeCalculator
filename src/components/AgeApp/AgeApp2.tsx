import "./AgeApp.css";
import { useState } from "react";
import btnImage from "./../../assets/images/icon-arrow.svg";
import { differenceInYears } from "date-fns";

interface DatesTypes {
  day: string;
  month: string;
  year: string;
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
  const [maxDays, setMaxDays] = useState<number>(31);
  const [inputDateDay, setInputDateDay] = useState<string>("");
  const [inputDateMonth, setInputDateMonth] = useState<string>("");
  const [inputDateYear, setInputDateYear] = useState<string>("");
  const [dayWarning, setDayWarning] = useState<string>("");
  const [monthWarning, setMonthWarning] = useState<string>("");
  const [yearWarning, setYearWarning] = useState<string>("");
  const [resultDate, setResultDate] = useState<DatesTypes>({
    day: "",
    month: "",
    year: "",
  });

  const isLeapYear = (year: number): Boolean => {
    return year % 4 === 0 ? true : false;
  };

  const setMaxD = (month: number, forInput: boolean): number => {
    if (month === 2) {
      return isLeapYear(forInput ? Number(inputDateYear) : actualYear)
        ? 29
        : 28;
    } else if (month <= 7) {
      return month % 2 === 0 ? 30 : 31;
    } else {
      return month % 2 === 0 ? 31 : 30;
    }
  };

  const checkNoEmpty = (): boolean => {
    return inputDateDay !== "" && inputDateMonth !== "" && inputDateYear !== "";
  };

  const dayResult = (): number => {
    if (Number(inputDateDay) > actualDay) {
      return actualDay + setMaxD(actualMonth - 1, false) - Number(inputDateDay);
    } else {
      return actualDay - Number(inputDateDay);
    }
  };

  const monthResult = (): number => {
    let extraYear: number = 0;
    Number(inputDateMonth) > actualMonth ? (extraYear = 12) : (extraYear = 0);

    if (Number(inputDateMonth) === actualMonth) {
      return 0;
    } else {
      return Number(inputDateDay) > actualDay
        ? actualMonth + extraYear - (Number(inputDateMonth) + 1)
        : actualMonth + extraYear - Number(inputDateMonth);
    }
  };

  const results = (): void => {
    const actualDate: Date = new Date(actualYear, actualMonth, actualDay);
    const dateGived: Date = new Date(
      Number(inputDateYear),
      Number(inputDateMonth),
      Number(inputDateDay)
    );
    if (checkNoEmpty() && maxDays >= Number(inputDateDay)) {
      warningMessage("dayInput", "");
      setResultDate({
        day: dayResult().toString(),
        month: monthResult().toString(),
        year: differenceInYears(actualDate, dateGived).toString(),
      });
    } else {
      if (maxDays < Number(inputDateDay)) {
        warningMessage("dayInput", "Need to be a valid day");
      }
      setResultDate({
        day: "",
        month: "",
        year: "",
      });
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

  const verifyContent = (
    inputElement: HTMLInputElement,
    inputName: string
  ): void => {
    inputElement.value = inputElement.value.replace(/\D/g, "");

    inputElement.value === "" && warningMessage(inputName, "Can`t be empty");
    if (inputName === "day") {
      inputElement.value = setMaxValue(Number(inputElement.value), maxDays);
    }
    if (inputName === "month") {
      inputElement.value = setMaxValue(Number(inputElement.value), 12);
    }
    if (inputName === "year") {
      inputElement.value = setMaxValue(Number(inputElement.value), actualYear);
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
          onChange={(e) => verifyContent(e.target, props.name)}
          maxLength={props.name === "year" ? 4 : 2}
        />
        <p className="warning" id={props.name + "Warning"}>
          {props.warning}
        </p>
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
      <div className="btn-container">
        <div className="line"></div>
        <button>
          <img src={btnImage} alt="arrowButton" />
        </button>
      </div>
      <div className="resultDate-container">
        <h1 className="years">
          <p>{resultDate.year === "" ? "- -" : resultDate.year}</p> years
        </h1>
        <h1 className="months">
          <p>{resultDate.month === "" ? "- -" : resultDate.month}</p> months
        </h1>
        <h1 className="days">
          <p>{resultDate.day === "" ? "- -" : resultDate.day}</p> days
        </h1>
      </div>
    </div>
  );
};

export default AgeApp2;
