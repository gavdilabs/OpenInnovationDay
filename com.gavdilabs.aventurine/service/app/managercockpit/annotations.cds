using BasicService as service from '../../srv/service';

annotate service.User with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Label : 'First name',
                Value : firstName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Last name',
                Value : lastName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'User name',
                Value : userName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Stage',
                Value : stage,
            },
        ],
    },
    UI.Facets                      : [{
        $Type  : 'UI.ReferenceFacet',
        ID     : 'GeneratedFacet1',
        Label  : 'General Information',
        Target : '@UI.FieldGroup#GeneratedGroup1',
    }, ]
);

annotate service.User with @(UI.DataPoint #contact : {
    $Type : 'UI.DataPointType',
    Title : 'Candidate Name',
    Value : firstName
});

annotate service.User with @(UI.HeaderFacets : [{
    $Type  : 'UI.ReferenceFacet',
    Target : '@UI.DataPoint#contact',
}, ]);

annotate service.User with @(UI.LineItem : [
    {
        $Type : 'UI.DataField',
        Label : 'Firstname',
        Value : firstName,
    },
    {
        $Type : 'UI.DataField',
        Label : 'Lastname',
        Value : lastName,
    },
    {
        $Type : 'UI.DataField',
        Label : 'Username',
        Value : userName,
    },
    {
        $Type : 'UI.DataField',
        Label : 'Email',
        Value : email,
    },
    {
        $Type                     : 'UI.DataField',
        Label                     : 'Stage',
        Value                     : stage,
        Criticality               : criticality,
        CriticalityRepresentation : #WithIcon,
    },
]);
