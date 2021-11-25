import { Formik } from "formik";
import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

const paymentOption = {
  token: "invoice",
  label: "We will call you next week to confirm your order",
};
const InvoicePaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: initialStatus || paymentOption.token }}
      onSubmit={(values, { setSubmitting }) => {
        processPayment(values.status);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        isSubmitting,
        isValid,
      }) => (
        <S.Form
          id={formId}
          ref={formRef}
          onSubmit={handleSubmit}
          data-test="finmidPaymentGatewayForm"
        >
          <S.Status key={paymentOption.token}>
            <span>{paymentOption.label}</span>
          </S.Status>
        </S.Form>
      )}
    </Formik>
  );
};

export { InvoicePaymentGateway };
