import { Func, Handler, Param, Req } from "cds-routing-handlers";
import { FuncGetCountryGroup}  from "../../entities/BasicService";
import { Service } from "typedi";
import { group } from "console";


@Handler()
@Service()
export default class GetCountryGroupHandler {
    @Func(FuncGetCountryGroup.name)
    public async  GetCountryGroup(
        @Req() req: any,
        @Param(FuncGetCountryGroup.paramCountryID) countryID: string,
    ): Promise<String[]> {
        let validGroupsQuery = SELECT.from('CountryToGroup').where(`countryID = '${countryID}'`).columns(el=> {el.groupID, el.name})
        let validGroups = await cds.run(validGroupsQuery) 
    return validGroups
    }
}

