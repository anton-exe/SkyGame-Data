import type { IGuid, IPeriod } from './base.interface.js';
import type { IArea } from './area.interface.js';
import type { ICalendarFm, IWiki } from './wiki.interface.js';
import type { ISpecialVisitSpirit } from './special-visit-spirit.interface.js';

export interface ISpecialVisit extends IGuid, IPeriod {
  /** Name of the occassion. */
  name?: string;

  /** Area the spirits visited.  */
  area?: IArea;
  /** Visiting spirits. */
  spirits: Array<ISpecialVisitSpirit>;

  imageUrl?: string;
  draft?: boolean;

  /// Metadata ///
  _wiki?: IWiki;
  _calendar?: ICalendarFm;
}
