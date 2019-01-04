/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { functionErrors } from '../../errors';

export const getCell = () => ({
  name: 'getCell',
  help: 'Fetch a single cell in a table',
  context: {
    types: ['datatable'],
  },
  args: {
    column: {
      types: ['string'],
      aliases: ['_', 'c'],
      help: 'The name of the column value to fetch',
    },
    row: {
      types: ['number'],
      aliases: ['r'],
      help: 'The row number, starting at 0',
      default: 0,
    },
  },
  fn: (context, args) => {
    const row = context.rows[args.row];
    if (!row) {
      throw functionErrors.getCell.rowNotFound(row);
    }

    const { column = context.columns[0].name } = args;
    const value = row[column];

    if (typeof value === 'undefined') {
      throw functionErrors.getCell.columnNotFound(column);
    }

    return value;
  },
});
