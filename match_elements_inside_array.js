/*
    MATCH ELEMENTS INSIDE OF AN ARRAY WITHIN INSIDE ANOTHER ARRAY SET
*/

const list1 = [1,2,3,4,"b"]; 
const list2 = ["a","b","c","d","e","f", 4,"g","h","i","j","k", 2];     

const test = (values1, values2, clearInnerData) => {
    const matched_values = [];
    
    for( let x = 0; x < values1.length; x++ ) {
        for( let y = 0; y < values2.length; y++ ) {
            if ( values1[x] === values2[y] ) {
            	matched_values.push(values1[x]);
            }
        }
    }
    return matched_values;
}

test(list1, list2);
