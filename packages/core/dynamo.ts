import { EntityConfiguration } from "electrodb";

import { Table } from "sst/node/table";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export * as Dynamo from "./dynamo";

export const Client = new DynamoDBClient({});

export const Configuration: EntityConfiguration = {
  table: (Table as Record<string, any>).table.tableName,
  client: Client,
};
