import { Query } from "@sap/cds/apis/cqn";
import { Request } from "@sap/cds/apis/services";

/**
 * CQNHelper - assistance class for parsing a CQN Query from Handler Request
 */

export enum CQNQueryOperator {
  EQUAL = "=",
}

export type SimpleCQNWhereClause = {
  field: string;
  operator: CQNQueryOperator;
  value: string;
};

export class CQNHelper {
  private query: Query;
  private select: SELECT<unknown>;

  constructor(query: Query) {
    this.query = query;
    this.select = query["SELECT"] as SELECT<unknown>;
  }

  /**
   * Function to securely derive in common structure the where clause structures from CQN query
   * @returns Array of where clause types
   */
  public getWhereClauseList(): SimpleCQNWhereClause[] {
    //We got what we need?
    if (!this.select || !this.select.where) {
      return [];
    }

    const whereClausesOut: SimpleCQNWhereClause[] = [];
    //ref or exr ?
    //ref
    if (this.select.where[0].ref) {
      whereClausesOut.push({
        field: this.select.where[0].ref[0],
        operator: this.select.where[1],
        value: this.select.where[2].val,
      });
    } else if (this.select.where[0].xpr) {
      const odataFilterArr = this.select.where[0].xpr;

      for (let i = 0; i < odataFilterArr.length; i++) {
        if (odataFilterArr[i].ref) {
          whereClausesOut.push({
            field: odataFilterArr[i].ref[0],
            operator: odataFilterArr[(i+1)],
            value: odataFilterArr[i+2].val,
          });
        }
      }
    }

    return whereClausesOut;
  }
}
