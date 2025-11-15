import { DateTime } from 'luxon';

export interface IGuid {
  guid: string;
}

export interface IPeriod {
  date: DateTime;
  endDate: DateTime;
}
