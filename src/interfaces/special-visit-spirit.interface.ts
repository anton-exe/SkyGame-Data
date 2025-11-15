import type { IGuid } from './base.interface.js';
import type { ISpecialVisit } from './special-visit.interface.js';
import type { ISpiritTree } from './spirit-tree.interface.js';
import type { ISpirit } from './spirit.interface.js';

export interface ISpecialVisitSpirit extends IGuid {
  /// References ///
  visit: ISpecialVisit;
  spirit: ISpirit;
  tree: ISpiritTree;
}
