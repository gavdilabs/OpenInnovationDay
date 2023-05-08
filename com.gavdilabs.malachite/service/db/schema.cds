using { managed, sap, cuid } from '@sap/cds/common';

namespace schema;

define type Url             : String(255);

entity User : cuid, managed {
    firstName: String(255);
    lastName: String(255);
    userName: String(100);
    email: String(255);
}

entity Action : cuid, managed {
    type: String(2);
    title: String(50);
    status: String(2);
    description: String(255);
    initiator: String(2);
    priority: String(20);
    onBoarding: Association to one Onboarding;
    communication: Association to many Communication;
}

entity Communication: cuid, managed {    
    type: String(2);
    message: String(500);
    subject: String(50);  
    action: Association to one Action;  
}

entity Onboarding : cuid, managed {    
    engagement          : String;    
    status              : String;       
    candidate           : Association to one Candidate;
    action              : Association to many Action;
}

entity Candidate : cuid, managed {    
    personId        : String;
    firstName       : String;
    lastName        : String;
    dateOfBirth     : Date;  
    employeeNumber  : String;
    street          : String;
    streetnumber    : Integer;
    zipcode         : String;
    city            : String;
    email           : String;
    phone           : String;
    picture         : Url;   
    onBoarding      : Association to one Onboarding;
}