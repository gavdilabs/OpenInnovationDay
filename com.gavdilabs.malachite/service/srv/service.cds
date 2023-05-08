using {schema} from '../db/schema';
//using { northwind } from './external/northwind';
using { sf } from './external/sf';

service BasicService {

    // ======================= ENTITIES ============================

   

    entity User as projection on schema.User;

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
