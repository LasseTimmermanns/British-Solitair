const fields = {}
const fieldScheme = 
  [ [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [true, true],   [true, true],   [true, true], [true, true], [true, true],   [true, true],   [true, true],
    [true, true],   [true, true],   [true, true], [true, false], [true, true],  [true, true],   [true, true],
    [true, true],   [true, true],   [true, true], [true, true], [true, true],   [true, true],   [true, true],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false],
    [false, false], [false, false], [true, true], [true, true], [true, true], [false, false], [false, false]];


const FieldManagementService = {
    getId: function(x, y) {
        return y * 7 + x;
    },

    //returns [x, y] as array from id
    extractPositionFromId: function(cellId) {
        let y = Math.floor(cellId / 7);
        let x = cellId % 7;

        return([x, y])
    },

    addFieldToDict: function(fieldId, componentRef){
        fields[fieldId] = componentRef;
    },

    getComponentRef: function(fieldId) {
        return fields[fieldId];
    },

    getFieldScheme: function() {
        return fieldScheme;
    },

    getFieldBetween: function(field1Id, field2Id){
        let pos1 = this.extractPositionFromId(field1Id);
        let pos2 = this.extractPositionFromId(field2Id);

        let xMiddle = (pos1[0] + pos2[0]) / 2;
        let yMiddle = (pos1[1] + pos2[1]) / 2;

        return this.getId(xMiddle, yMiddle)
    }
}; 

export default FieldManagementService;