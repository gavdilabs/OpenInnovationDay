using { managed, sap, cuid } from '@sap/cds/common';

namespace schema;

define type Url             : String(255);

entity Users : cuid, managed {
    firstName: String(255);
    lastName: String(255);
    userName: String(100);
    email: String(255);
}

entity Actions : cuid, managed {
    type: String(2);
    title: String(50);
    status: String(2);
    description: String(255);
    initiator: String(2);
    priority: String(20);
    onBoarding: Association to one OnBoardings;
    communications: Association to many Communications on communications.action = $self;
}

entity Communications: cuid, managed {    
    type: String(2);
    message: String(500);
    subject: String(50);  
    action: Association to one Actions;  
}

entity OnBoardings : cuid, managed {    
    engagement          : String;    
    status              : String;       
    candidate           : Association to one Candidates;
    actions            : Association to many Actions on actions.onBoarding = $self;
}

entity Candidates : cuid, managed {    
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
    onBoarding      : Association to one OnBoardings;
}