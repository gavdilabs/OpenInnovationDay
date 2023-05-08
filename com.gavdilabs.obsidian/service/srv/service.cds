using {schema} from '../db/schema';
service BasicService @(requires: 'authenticated-user') {

    // ======================= ENTITIES ============================

    entity User @(restrict: [
        {
            grant: ['READ'],
            to: ['USER']
        },
        {
            grant: ['READ', 'UPDATE', 'CREATE'],
            to: ['MANAGER']
        },
        {
            grant: ['*'],
            to: ['ADMIN']
        }
    ]) as projection on schema.User;

    entity Country as projection on schema.Country;
    entity Group as projection on schema.Group;
    entity CountryToGroup as projection on schema.CountryToGroup;
    entity RulesSetCountry as projection on schema.RulesSetCountry;
    entity RulesSetGroup as projection on schema.RulesSetGroup;
    entity Rule as projection on schema.Rule;
    entity RulesEntry as projection on schema.RulesEntry;


    // ==================== ACTION IMPORTS ==========================


    // =================== FUNCTION IMPORTS ==========================

    // ================== EXTERNAL SERVICES ==========================

}
