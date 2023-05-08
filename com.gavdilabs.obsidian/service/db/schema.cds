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
    rulesets: Association to many RulesSetCountry on rulesets.countryID = $self.ID;
}

entity Group : cuid, managed {
    key ID: UUID;
    name: String(255);
    countries: Association to many CountryToGroup on countries.groupID = $self.ID;
    rulesets: Association to many RulesSetGroup on rulesets.groupID = $self.ID;

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
}

entity RulesSetCountry : cuid, managed {
    key ID: UUID;
    ruleID: String(255);
    countryID: String(255);
    title: String(255);
    country: Association to Country on country.ID = $self.countryID;
    rule: Association to Rule on rule.ID = $self.ruleID;
    dataentries: Association to many RulesEntry on dataentries.rulesetID = $self.ID;
}

entity RulesSetGroup : cuid, managed {
    key ID: UUID;
    ruleID: String(255);
    groupID: String(255);
    title: String(255);
    group: Association to Group on group.ID = $self.groupID;
    rule: Association to Rule on rule.ID = $self.ruleID;
    dataentries: Association to many RulesEntry on dataentries.rulesetID = $self.ID;
}

entity RulesEntry : cuid, managed {
    key ID: UUID;
    rulesetID: String(255);
    dataentry: String(255);
}