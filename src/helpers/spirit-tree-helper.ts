import type { IItem } from '../interfaces/item.interface.js';
import type { INode } from '../interfaces/node.interface.js';
import type { ISpiritTree, ISpiritTreeTier } from '../interfaces/spirit-tree.interface.js';
import { NodeHelper } from './node-helper.js';

export class SpiritTreeHelper {
  static getNodes(tree?: ISpiritTree): Array<INode> {
    if (!tree) {
      return [];
    }
    if (tree.node) {
      return NodeHelper.all(tree.node);
    }
    if (tree.tier) {
      const tiers = this.getTiers(tree);
      return tiers.flatMap(t => t.rows.flat()).filter(n => n) as Array<INode>;
    }
    return [];
  }

  static getTiers(tree?: ISpiritTree): Array<ISpiritTreeTier> {
    const tiers: Array<ISpiritTreeTier> = [];
    let tier: ISpiritTreeTier | undefined = tree?.tier;
    while (tier) {
      tiers.push(tier);
      tier = tier.next;
    }
    return tiers;
  }

  static getItems(tree?: ISpiritTree, includeHidden?: boolean): Array<IItem> {
    if (!tree) { return []; }
    const itemSet = new Set<IItem>();
    this.getNodes(tree).filter(n => n.item).forEach(n => {
      itemSet.add(n.item!);
      includeHidden && n.hiddenItems?.forEach(i => itemSet.add(i));
    });
    return [...itemSet];
  }
}
