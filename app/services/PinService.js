var selectedFieldId;


const PinService = {
    selectField: function(fieldId) {
        selectedFieldId = fieldId;
        console.log("fieldID" + selectedFieldId);
    },
};

export default PinService;