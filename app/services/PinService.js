import FieldManagementService from "./FieldManagementService";

var selectedFieldId;


const PinService = {
    selectField: function(fieldId) {
        if(selectedFieldId) FieldManagementService.getComponentRef(selectedFieldId).current.setSelected(false);
        selectedFieldId = fieldId;
        console.log("fieldID" + selectedFieldId);
    },
};

export default PinService;