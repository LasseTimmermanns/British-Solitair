import FieldManagementService from "./FieldManagementService";
import MovementService from "./MovementService";

var selectedFieldId;

const PinService = {
    selectField: function(fieldId) {
        if(selectedFieldId === fieldId) return;
        
        this.unselectField();

        selectedFieldId = fieldId;
    },
    getSelectedFieldId: function() {
        return selectedFieldId;
    },

    unselectField: function() {
        if(typeof selectedFieldId !== 'undefined'){
            if(MovementService.cellIsValidFromId(selectedFieldId)) {
                FieldManagementService.getComponentRef(selectedFieldId).current.setSelected(false);
            }
        }
    }
};

export default PinService;