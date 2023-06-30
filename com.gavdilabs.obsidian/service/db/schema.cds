using {  managed, sap, cuid } from '@sap/cds/common';

namespace schema;

entity User : cuid, managed {
    key ID: UUID;
    firstName: String(255);
    lastName: String(255);
    userName: String(100);
    email: String(255);
}

entity Country : cuid, managed {
    key ID: UUID;
    name: String(255);
    countryCode: String(255);
    groups: Association to many CountryToGroup on groups.countryID = $self.ID;
    rulesets: Association to many RulesSet on rulesets.targetID = $self.ID and rulesets.targetType = 'country';
}

entity Group : cuid, managed {
    key ID: UUID;
    name: String(255);
    countries: Association to many CountryToGroup on countries.groupID = $self.ID;
    rulesets: Association to many RulesSet on rulesets.targetID = $self.ID and rulesets.targetType = 'group';
}

entity CountryToGroup : cuid, managed {
    key ID: UUID;
    name: String(255);
    groupID: String(255);
    countryID: String(255);
    group: Association to Group on group.ID = $self.groupID;
    country: Association to Country on country.ID = $self.countryID;
}

entity Rule : cuid, managed {
    key ID: UUID;
    name: String(255);
    rulesets: Association to many RulesSet on rulesets.ruleID = $self.ID;
}

entity RulesSet : cuid, managed {
    key ID: UUID;
    ruleID: String(255);
    targetID: String(255);
    targetType: String(255);
    title: String(255);
    rule: Association to Rule on rule.ID = $self.ruleID;
    dataentries: Association to many RulesEntry on dataentries.rulesetID = $self.ID;
}

entity RulesEntry : cuid, managed {
    key ID: UUID;
    rulesetID: String(255);
    dataentry: String(255);
}
