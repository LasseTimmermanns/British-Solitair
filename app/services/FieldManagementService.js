const fields = {}

const FieldManagementService = {
    generateId: function(x, y) {
        return y * 7 + x;
    },

    addFieldToDict: function(fieldId, componentRef){
        fields[fieldId] = componentRef;
    },

    getComponentRef: function(fieldId) {
        return fields[fieldId];
    }
};

export default FieldManagementService;