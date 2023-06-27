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
import { IPermissionsOut, IPermissionsOutRole } from "common";
import { CQNHelper } from "../../lib/cqnHelper";

/**
 * Interface for the XML parsing. @ attributes indicate 'tag attributes'. This prefix is specified
 * in ServiceXMLParser.ts
 */

interface IPermissionXml {
  "user-permission": {
    user: IPermissionUserXml[];
  };
}

interface IPermissionUserXml {
  "@id": string;
  role: [
    {
      "@id": string;
      "@name": string;
      "@description": string;
      category: {
        "@name": string;
        permissions: {
          "permission-unit": [
            {
              "on-off-permission": {
                "permission-item": {
                  "@perm-type": string;
                  "@permission-string-value": string;
                  message: {
                    "@key": string;
                    content: {
                      "#text";
                    };
                  };
                };
              };
            }
          ];
        };
      };
    }
  ];
}

/**
 * Raw data coming from SF function import. 1 property with a huge XML string is what u get.
 */
interface ISFPermissionDataRaw {
  getUsersPermissions: string;
}

@Handler(SanitizedEntity.Permissions)
@Service()
export default class PermissionHandler {
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
      `/getUsersPermissions?userIds='${userIds.join(",")}'&locale=en_GB`
    )) as ISFPermissionDataRaw;

    //Check if we are good
    const parsedData =
      ServiceXMLParser.parseFromXmlStringToJson<IPermissionXml>(
        roleData.getUsersPermissions
      );

    let permissionsOut: IPermissionsOut[] = [];

    //Add the roles - if they are there
    if (
      parsedData["user-permission"] &&
      parsedData["user-permission"].user &&
      parsedData["user-permission"].user
    ) {
      //Loop each role and dissect the permissions inside
      parsedData["user-permission"].user.forEach((user) => {
        const userTmp: IPermissionsOut = {
          userId: user["@id"],
          roles: [],
        };

        //attach roles to each user
        user.role.forEach((role) => {
          //Create the stub output
          let permissionTmp: IPermissionsOutRole = {
            role: role["@name"],
            roleDescription: role["@description"],
            permissions: [],
          };

          //Attach permission data to each
          if (
            role.category &&
            role.category.permissions &&
            role.category.permissions &&
            role.category.permissions["permission-unit"]
          ) {
            //Loop the permissions inside each role
            if (Array.isArray(role.category.permissions["permission-unit"])) {
              role.category.permissions["permission-unit"].forEach(
                (permissionUnit) => {

                  //Guard is needed as parts might be missing/optional
                  if( permissionUnit["on-off-permission"] && permissionUnit["on-off-permission"]["permission-item"] ){
                    const permissionInner = permissionUnit["on-off-permission"]["permission-item"];

                    permissionTmp.permissions.push({
                      category: role.category["@name"],
                      description: permissionInner.message.content["#text"],
                      name: permissionInner.message["@key"],
                      permission: permissionInner["@permission-string-value"],
                      type: permissionInner["@perm-type"],
                    });
                  }

                  
                }
              );
            }
          }

          //Add the role record to output
          userTmp.roles.push(permissionTmp);
        });

        permissionsOut.push(userTmp);
      });
    }

    //feature/apply-sorting-role-names
    //Sort the roles for each end-user
    permissionsOut.forEach(userTmp => {
      userTmp.roles = userTmp.roles.sort((roleA, roleB) => {
        return (roleA.role <= roleB.role) ? -1 : 1;  
      });
    });

    //Return the parsed role structure
    return Promise.resolve(permissionsOut);
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
