import { Formik } from "formik";
import React from "react";

import { Radio } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const paymentOptions = [
  { token: "fully-charged", label: "Buy now, pay in 60 days", enabled: true },
  {
    token: "partially-charged",
    label: "Buy now, repay with 3 equal installments every 30 days",
    enabled: false,
  },
];

const FinmidPaymentGateway: React.FC<IProps> = ({
  processPayment,
  formRef,
  formId,
  initialStatus,
}: IProps) => {
  return (
    <Formik
      initialValues={{ status: initialStatus || paymentOptions[0].token }}
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
          {paymentOptions.map(({ token, label, enabled }) => {
            return (
              <S.Status
                key={token}
                style={
                  enabled
                    ? {}
                    : { backgroundColor: "rgb(243, 243, 243)", color: "#999" }
                }
              >
                <Radio
                  key={token}
                  type="radio"
                  name="status"
                  value={token}
                  disabled={!enabled}
                  checked={values.status === token}
                  onChange={handleChange}
                >
                  <span>{label}</span>
                </Radio>
              </S.Status>
            );
          })}
        </S.Form>
      )}
    </Formik>
  );
};

export { FinmidPaymentGateway };
