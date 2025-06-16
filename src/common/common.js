import { isEqual } from 'lodash';

export const deleteArrayToValue = (array, deleteValue) => {

    const filtered = array.filter((value) => {
        return !isEqual(value, deleteValue);
    });

    return filtered;
}

// module.exports = {
//     deleteArrayToValue: deleteArrayToValue
// }