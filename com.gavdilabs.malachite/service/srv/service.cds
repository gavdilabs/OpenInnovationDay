using {schema} from '../db/schema';
//using { northwind } from './external/northwind';
using { sf } from './external/sf';

service BasicService {

    // ======================= ENTITIES ============================

    entity Users as projection on schema.User;

    entity Candidates as projection on schema.Candidate;

    entity Actions as projection on schema.Action;

    entity Communications as projection on schema.Communication;

    entity OnBoardings as projection on schema.Onboarding;

    // ==================== ACTION IMPORTS ==========================


    // =================== FUNCTION IMPORTS ==========================

    // ================== EXTERNAL SERVICES ==========================
    /*
    entity NWProduct @(restrict: [
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
    ]) as projection on northwind.Products;
    */
    
    entity SFUser @(restrict: [
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
    ]) as projection on sf.User;
    
}
