import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";

export default function Example() {
  const { control, handleSubmit } = useForm();
  const [submittedDate, setSubmittedDate] = useState();

  const onSubmit = ({ date }) => {
    setSubmittedDate(date);
  };

  return (
    <>
  
    </>
  )
}