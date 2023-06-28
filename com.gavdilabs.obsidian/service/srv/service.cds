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

/*
    define entity RuleCombined {
        ruleID:String(255);
        rule: Association to Rule on rule.ID = $self.ruleID;
        ruleSets: many RuleSetsCombined;
    };*/

/*
    define type RuleSetsCombined {
        ruleID: String(255);
        targetID: String(255);
        targetType:  String(255);
        title: String(255);
        dataentries: array of {
            ID: String(255);
            rulesetID: String(255);
            dataentry: String(255);
        };
    };*/

    entity Country as projection on schema.Country;
    entity Group as projection on schema.Group;
    entity CountryToGroup as projection on schema.CountryToGroup;
    //entity RulesSetCountry as projection on schema.RulesSetCountry;
    //entity RulesSetGroup as projection on schema.RulesSetGroup;
        
        
    entity RulesSet as projection on schema.RulesSet;
    entity Rule as projection on schema.Rule;
    entity RulesEntry as projection on schema.RulesEntry;
    function GetCountryGroup(countryID: String) returns array of String;
    //entity RuleCombined as projection on schema.RuleCombined;
    //function GetAllCountryRulesets(countryID: String) returns many RuleCombined;
    //function GetGroupRulesets(countryID: String) returns many RulesSetGroup;


    // ==================== ACTION IMPORTS ==========================


    // =================== FUNCTION IMPORTS ==========================

    // ================== EXTERNAL SERVICES ==========================

}
