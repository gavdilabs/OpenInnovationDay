using {schema} from '../db/schema';
using { sf } from './external/sf';

service BasicService @(requires: 'authenticated-user') {

    // ======================= ENTITIES ============================
/*
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
    ]) as projection on schema.User;*/

    // ==================== ACTION IMPORTS ==========================


    // =================== FUNCTION IMPORTS ==========================

    // ================== EXTERNAL SERVICES ==========================
    /*entity NWProduct @(restrict: [
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
    ]) as projection on northwind.Products;*/

    entity SFUser as projection on sf.User;
    entity SFPosition as projection on sf.Position;

}
