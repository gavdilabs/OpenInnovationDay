import { Request } from "@sap/cds/apis/services";
import {
  Handler,
  OnCreate,
  OnDelete,
  OnRead,
  OnUpdate,
  Req,
} from "cds-routing-handlers";
import { Inject, Service } from "typedi";
import { SanitizedEntity } from "../../entities/EasyPermissionService";
import SF from "../../services/SF";
import ServiceXMLParser from "../../core/utils/xmlParser";
import { IRolesOutRoot } from "common";
import { expr } from "@sap/cds/apis/cqn";
import { CQNHelper } from "../../lib/cqnHelper";

/**
 * Interface for the XML parsing. @ attributes indicate 'tag attributes'. This prefix is specified
 * in ServiceXMLParser.ts
 */

type RoleXml = {
  "user-role-granting": {
    user: RoleXmlUser | RoleXmlUser[];
  };
};

type RoleXmlUser = {
  "@id": string;
  role: [
    {
      "@id": string;
      "@name": string;
      rule: {
        "@id": string;
        "@last-modified-by": string;
        "@last-modified-date": string;
        "access-group": {
          "@created-by": string;
          "@created-date": string;
          "@id": string;
          "@last-modified-by": string;
          "@last-modified-date": string;
          "@member-count": string;
          "include-people-pool": string;
          "@name": string;
        };
        "target-group": {
          "@created-by": string;
          "@created-date": string;
          "@id": string;
          "@last-modified-by": string;
          "@last-modified-date": string;
          "@member-count": string;
          "include-people-pool": string;
          "@name": string;
        };
      };
    }
  ];
};

/**
 * Raw data coming from SF function import. 1 property with a huge XML string is what u get.
 */
interface ISFRoleDataRaw {
  getUserRolesReport: string;
}

@Handler(SanitizedEntity.Roles)
@Service()
export default class RoleHandler {
  @Inject("sf")
  private sfService: SF;

  @OnRead()
  public async OnRead(@Req() req: Request): Promise<unknown> {
    //First validate if we are working with single key or
    let userIds: string[] = req.data.userId ? [req.data.userId] : [];

    //No key found - we will check the query params
    if (userIds.length === 0) {
      //Get the where clauses from CQN - filtered to fieldId = 'UserId'
      const whereClauses = new CQNHelper(req.query)
        .getWhereClauseList()
        .filter((whereClause) => {
          return whereClause.field === "userId";
        });

        whereClauses.forEach((whereClause) => {
          if (whereClause.value) {
            userIds.push(whereClause.value);
          }
        });
    }

    //No valid key then just return
    if (userIds.length === 0) {
      return Promise.reject({
        error: { message: "Bad Request - Missing UserId(s)" },
      });
    }

    //Obtain a connection to the 'sf' service configured
    const connection = await this.sfService.GetConnection();

    //Call the function import 'directly' specifying the url params needed
    const roleData = (await connection.get(
      `/getUserRolesReport?userIds='${userIds.join(',')}'`
    )) as ISFRoleDataRaw;

    //Check if we are good
    const parsedData = ServiceXMLParser.parseFromXmlStringToJson<RoleXml>(
      roleData.getUserRolesReport
    );

    const rolesOut: IRolesOutRoot[] = [];

    //Add the roles - if they are there
    if (
      parsedData["user-role-granting"] &&
      parsedData["user-role-granting"].user
    ) {
      //Do we have 1 or more users? Parse to array anyways.
      const users: RoleXmlUser[] = Array.isArray(
        parsedData["user-role-granting"].user
      )
        ? (parsedData["user-role-granting"].user as RoleXmlUser[])
        : [parsedData["user-role-granting"].user as RoleXmlUser];

      //Loop the users
      users.forEach((user) => {

        let roleTmp:IRolesOutRoot = {
          userId: user["@id"],
          roles: [],
        }

        user.role.forEach((role) => {
          roleTmp.roles.push({
            name: role["@name"],
            access: role.rule["access-group"]
              ? role.rule["access-group"]["@name"]
              : "",
            target: role.rule["target-group"]
              ? role.rule["target-group"]["@name"]
              : "",
          });
        });

        rolesOut.push(roleTmp);

      });
    }

    //feature/apply-sorting-role-names
    //Sort the roles for each end-user
    rolesOut.forEach(userTmp => {
      userTmp.roles = userTmp.roles.sort((roleA, roleB) => {
        return (roleA.name <= roleB.name) ? -1 : 1;  
      });
    });

    //Return the parsed role structure
    return Promise.resolve(rolesOut);
  }

  @OnCreate()
  public async OnCreate(@Req() req: Request): Promise<unknown> {
    return Promise.reject("Not Implemented");
  }

  @OnUpdate()
  public async OnUpdate(@Req() req: Request): Promise<unknown> {
    return Promise.reject("Not Implemented");
  }

  @OnDelete()
  public async OnDelete(@Req() req: Request): Promise<unknown> {
    return Promise.reject("Not Implemented");
  }
}
