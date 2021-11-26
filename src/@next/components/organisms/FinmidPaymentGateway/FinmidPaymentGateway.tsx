import React, { useEffect, useState } from "react";

import { Radio } from "@components/atoms";

import { FinmidPaymentGatewayForm } from "./FinmidPaymentGatewayForm";
import * as LS from "../PaymentGatewaysList/styles";
import { IProps } from "./types";

import { TypedPrecheckQuery } from "./queries";
import { useCart } from "@saleor/sdk";
import { PayButton } from "./PayButton";

interface Props extends IProps {
  checked: boolean;
  onSelect: () => void;
  processPayment: (token: string) => void;
  name: string;
  selectedPaymentGatewayToken?: string;
}

const FinmidPaymentGateway: React.FC<Props> = props => {
  const { totalPrice } = useCart();

  if (totalPrice == null) return null;

  return (
    <TypedPrecheckQuery
      variables={{
        amount: totalPrice?.gross.amount,
      }}
      fetchPolicy="network-only"
    >
      {({ data, loading }) => (
        <GatewayCheckbox
          {...props}
          precheck={data?.precheck}
          loading={loading}
        />
      )}
    </TypedPrecheckQuery>
  );
};

interface GatewayProps extends Props {
  precheck: boolean | null | undefined;
  loading: boolean;
}

const GatewayCheckbox: React.FC<GatewayProps> = ({
  checked,
  onSelect,
  name,
  formRef,
  formId,
  processPayment,
  selectedPaymentGatewayToken,
  loading,
  precheck,
}) => {
  // Simulating longer loading precheck
  const [loaded, setLoaded] = useState(false);

  const canUseFinmid = loaded && precheck === true;

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setLoaded(true), 2000);
    }
  }, [loading]);

  return !loaded ? (
    <span>Checking if you can pay via finmid...</span>
  ) : canUseFinmid ? (
    <div>
      <LS.Tile checked={checked}>
        <Radio
          data-test="checkoutPaymentGatewayDummyInput"
          name="payment-method"
          value="finmid"
          checked={checked}
          disabled={!(precheck ?? false)}
          onChange={onSelect}
          customLabel
        >
          <PayButton />
        </Radio>
      </LS.Tile>
      {checked && (
        <FinmidPaymentGatewayForm
          formRef={formRef}
          formId={formId}
          processPayment={processPayment}
          initialStatus={selectedPaymentGatewayToken}
        />
      )}
    </div>
  ) : (
    <span>Precheck eightball says "NO"</span>
  );
};

export { FinmidPaymentGateway };
