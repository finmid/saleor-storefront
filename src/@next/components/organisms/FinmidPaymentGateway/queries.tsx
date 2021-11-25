import gql from "graphql-tag";
import { TypedQuery } from "../../../../core/queries";
import { Precheck, PrecheckVariables } from "./gqlTypes/precheck";

const precheckQuery = gql`
  query Precheck($amount: Float!) {
    precheck(amount: $amount)
  }
`;

export const TypedPrecheckQuery = TypedQuery<Precheck, PrecheckVariables>(
  precheckQuery
);
