import { DateTime } from 'luxon';

export class SkyDateHelper {
  
  static readonly skyTimeZone = 'America/Los_Angeles';

  static fromStringSky(date: string): DateTime {
    return DateTime.fromFormat(date, 'yyyy-MM-dd', { zone: this.skyTimeZone });
  }
}