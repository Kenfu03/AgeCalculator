import { useState } from "react";
import { differenceInYears } from "date-fns";
import "./AgeApp.css";
import btnImage from "./../../assets/images/icon-arrow.svg";

interface DatesTypes {
  day: string;
  month: string;
  year: string;
}

interface InputInterface {
  name: string;
  placeHolder: string;
  value: any;
}

const AgeApp = () => {
  const date: Date = new Date();
  const actualDay: number = date.getDate();
  const actualMonth: number = date.getUTCMonth() + 1;
  const actualYear: number = date.getFullYear();
  const [maxDays, setMaxDays] = useState<number>(31);
  const [dayWarning, setDayWarning] = useState<string>("");
  const [monthWarning, setMonthWarning] = useState<string>("");
  const [yearWarning, setYearWarning] = useState<string>("");
  const [inputDateDay, setInputDateDay] = useState<string>("");
  const [inputDate, setInputDate] = useState<DatesTypes>({
    day: "",
    month: "",
    year: "",
  });
  const [resultDate, setResultDate] = useState<DatesTypes>({
    day: "",
    month: "",
    year: "",
  });

  /* Logica */

  const isLeapYear = (year: number): Boolean => {
    if (year % 4 === 0) {
      return true;
    } else {
      return false;
    }
  };

  const setMaxD = (month: number, forInput: boolean): number => {
    if (month === 2) {
      if (forInput) {
        forInput = false;
        return isLeapYear(+inputDate.year) ? 29 : 28;
      } else {
        return isLeapYear(actualYear) ? 29 : 28;
      }
    } else if (month <= 7) {
      return month % 2 === 0 ? 30 : 31;
    } else {
      return month % 2 === 0 ? 31 : 30;
    }
  };

  const checkNoEmpty = (): boolean => {
    return (
      inputDate.month !== "" && inputDate.day !== "" && inputDate.year !== ""
    );
  };

  const dayResult = (): number => {
    if (+inputDate.day > actualDay) {
      return actualDay + setMaxD(actualMonth - 1, false) - +inputDate.day;
    } else {
      return actualDay - +inputDate.day;
    }
  };

  const monthResult = (): number => {
    if (+inputDate.month > actualMonth) {
      return +inputDate.day > actualDay
        ? actualMonth + 12 - (+inputDate.month + 1)
        : actualMonth + 12 - +inputDate.month;
    } else if (+inputDate.month === actualMonth) {
      return 0;
    } else {
      return +inputDate.day > actualDay
        ? actualMonth - (+inputDate.month + 1)
        : actualMonth - +inputDate.month;
    }
  };

  const results = (): void => {
    const actualDate: Date = new Date(actualYear, actualMonth, actualDay);
    const dateGived: Date = new Date(
      +inputDate.year,
      +inputDate.month,
      +inputDate.day
    );
    if (checkNoEmpty() && maxDays >= +inputDate.day) {
      displayWarningMessage("dayInput", "");
      setResultDate({
        day: dayResult().toString(),
        month: monthResult().toString(),
        year: differenceInYears(actualDate, dateGived).toString(),
      });
    } else {
      if (maxDays < +inputDate.day) {
        displayWarningMessage("dayInput", "Need to be a valid day");
      }
      setResultDate({
        day: "",
        month: "",
        year: "",
      });
    }
  };

  /*  Inputs y validaciones de datos */

  const displayWarningMessage = (
    itemWarning: string | null,
    warningMsg: string
  ): void => {
    if (itemWarning === "dayInput") {
      setDayWarning(warningMsg);
    } else if (itemWarning === "monthInput") {
      setMonthWarning(warningMsg);
    } else {
      setYearWarning(warningMsg);
    }
  };

  const verifyDay = (inputElement: HTMLInputElement): void => {
    const newValue = inputElement.value.replace(/\D/g, "");
    setInputDateDay(newValue);
  };

  const verifyContent = (inputElement: HTMLInputElement): void => {
    let dayInputVerify: boolean =
      inputElement.getAttribute("id") === "dayInput";
    let monthInputVerify: boolean =
      inputElement.getAttribute("id") === "monthInput";
    let yearInputVerify: boolean =
      inputElement.getAttribute("id") === "yearInput";

    const newValue = inputElement.value.replace(/\D/g, "");

    if (dayInputVerify) {
      setInputDateDay(newValue);
      // (maxDays < +inputDate.day) ?? console.log("numero invalido")
    }
    // if (monthInputVerify) {
    //   setMaxDays(setMaxD(+inputElement.value, true));
    //   setInputDate({ ...inputDate, month: inputElement.value });
    // }
    // if (yearInputVerify) {
    //   inputElement.value = inputElement.value.slice(0, 4);
    //   if (+inputElement.value > actualYear) {
    //     inputElement.value = actualYear + "";
    //   }
    //   setInputDate({ ...inputDate, year: inputElement.value });
    // }
    // if (inputElement.value === "") {
    // }
  };

  const InputDate = (props: InputInterface) => {
    return (
      <div className={"inputDate-items"}>
        <p>{props.name}</p>
        <input
          type="text"
          id={props.name + "Input"}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={(e) =>
            props.name === "day"
              ? verifyDay(e.target)
              : props.name === "month"
              ? verifyDay(e.target)
              : verifyDay(e.target)
          }
          maxLength={props.name === "year" ? 4 : 2}
        />
        <p className="warning" id={props.name + "Warning"}>
          {dayWarning}
        </p>
      </div>
    );
  };



  return (
    <div className="ageApp-container">
      <div className="inputDate-container">
        <InputDate name="day" placeHolder="DD" value={inputDateDay} />
        <InputDate name="month" placeHolder="MM" value={inputDateDay} />
        <InputDate name="year" placeHolder="YYYY" value={inputDateDay} />
      </div>
      <div className="btn-container">
        <div className="line"></div>
        <button onClick={() => results()}>
          <img src={btnImage} alt="arrowButton" />
        </button>
      </div>
    </div>
  );
};

export default AgeApp;
