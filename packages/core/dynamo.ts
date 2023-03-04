import { EntityConfiguration } from "electrodb";

import { Table } from "@serverless-stack/node/table";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export * as Dynamo from "./dynamo";

export const Client = new DynamoDBClient({});

export const Configuration: EntityConfiguration = {
  table: Table.table.tableName,
  client: Client,
};
