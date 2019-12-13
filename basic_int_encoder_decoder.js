/*
    CONVERT INT TO STRINGS CHARACTERS HIDDING INTEGER VALUE AND DECODE IT TO GET ORIGINAL INT VALUE BACK.
*/
const encode_int = (int) => {
    let newArr = [];
    let arr = Array.from(int.toString());

    function letter_map(arr) {
        switch (arr) {
            case 1:
                return 'κ';
                break;
            case 2:
                return 'ι';
                break;
            case 3:
                return 'θ';
                break;
            case 4:
                return 'η';
                break;
            case 5:
                return 'ζ';
                break;
            case 6:
                return 'ϵ';
                break;
            case 7:
                return 'δ';
                break;
            case 8:
                return 'γ';
                break;
            case 9:
                return 'β';
                break;
            case 0:
                return 'α';
                break;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        newArr.push(letter_map(parseInt(arr[i])));
    }    
    return newArr.join("");

}

const decode_int = (str) => {
    let newArr = [];
    let arr = Array.from(str);

    function letter_map(arr) {
        switch (arr) {
            case 'κ':
                return 1;
                break;
            case 'ι':
                return 2;
                break;
            case 'θ':
                return 3;
                break;
            case 'η':
                return 4;
                break;
            case 'ζ':
                return 5;
                break;
            case 'ϵ':
                return 6;
                break;
            case 'δ':
                return 7;
                break;
            case 'γ':
                return 8;
                break;
            case 'β':
                return 9;
                break;
            case 'α':
                return 0;
                break;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        newArr.push(letter_map(arr[i]));
    }    
    return eval(newArr.join(""));
}

