//import Sound from "react-native-sound";
import FieldManagementService from "./FieldManagementService";
import PinService from "./PinService";

var moveHistory = []
//const moveSound = new Sound('../assets/movesound.mp3', Sound.MAIN_BUNDLE);

const MovementService = {
    cellIsValid: function(x, y){
        const id = FieldManagementService.getId(x, y);

        if(id > 49 || id < 0){
            return false;
        } 

        const scheme = FieldManagementService.getFieldScheme();
        return scheme[id][0];
    },

    cellIsValidFromId: function(cellId){
        const coords = FieldManagementService.extractPositionFromId(cellId);
        return this.cellIsValid(coords[0], coords[1]);
    },

    getPossibleFields: function(x, y){
        const coords = [[x, y-2], [x, y+2], [x-2, y], [x+2, y]]
        let out = [];

        for(let i = 0; i < coords.length; i++){
            const xLocal = coords[i][0], yLocal = coords[i][1];

            //Check if cell is on Field
            if(!this.cellIsValid(xLocal, yLocal)) continue;
            
            //Check if cell has pin
            const id = FieldManagementService.getId(xLocal, yLocal);
            const ref = FieldManagementService.getComponentRef(id).current;

            if(ref.isPinned()) continue;

            out.push(id);
        }

        return out;
    },

    getPossibleFieldsFromId: function(fieldId) {
        let position = FieldManagementService.extractPositionFromId(fieldId);
        return this.getPossibleFields(position[0], position[1]);
    },

    registerMove: function(field1Id, field2Id){
        //Start
        const ref1 = FieldManagementService.getComponentRef(field1Id).current;
        ref1.setPinned(false);

        //End
        const ref2 = FieldManagementService.getComponentRef(field2Id).current;
        ref2.setPinned(true);

        //Middle
        let middleId = FieldManagementService.getFieldBetween(field1Id, field2Id);
        const ref3 = FieldManagementService.getComponentRef(middleId).current;
        ref3.setPinned(false);

        PinService.unselectField();

        moveHistory.push({from: field1Id, to: field2Id, middle: middleId})
        //moveSound.play();
    },

    undoMove: function(){
        lastMove = moveHistory.pop()

        if(typeof lastMove === 'undefined') return;

        let field1Id = lastMove.from;
        let field2Id = lastMove.to;
        let middleId = lastMove.middle;

        const ref1 = FieldManagementService.getComponentRef(field1Id).current;
        ref1.setPinned(true);

        const ref2 = FieldManagementService.getComponentRef(field2Id).current;
        ref2.setPinned(false);

        const ref3 = FieldManagementService.getComponentRef(middleId).current;
        ref3.setPinned(true);

        PinService.unselectField();
        //moveSound.play();
    },

    startNewGame: function() {
        while(moveHistory.length > 0){
            this.undoMove();
        }
    }
};

export default MovementService;