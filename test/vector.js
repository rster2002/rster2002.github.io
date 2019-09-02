function vec2(a, b) { return [a, b] }

function vec() {

    let args = [];
    
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    if (Array.isArray(args[0])) {
        
        var vector = []
        args.forEach(a => {
            vector.push(a);
        })
    
        return vector;

    } else if (typeof args[0] === "string") {

        let shape = args[0];
        shape = shape.split("x");
        let colms = Number(shape[0]);
        let rows = Number(shape[1]);
        let val = args[1] !== undefined ? args[1] : 0;
        
        let vector = [];
        for (var r = 1; r <= rows; r++) {
            let row = [];
            for (var c = 1; c <= colms; c++) {
                if (typeof val === "function") {
                    row.push(val());
                } else {
                    row.push(val);
                }
            }
            vector.push(row);
        }

        return vector;
    }
    
}

// Adds to matries together
function vecAdd(vec1, vec2) {

    let returnVec = [];

    vec1.forEach((row, rowIndex) => {

        let returnRow = [];

        row.forEach((colm, colmIndex) => {

            returnRow.push(colm + vec2[rowIndex][colmIndex]);

        });

        returnVec.push(returnRow);

    });

    return returnVec;

}

// Multiplies two matries together
function vecMultiply(vec1, vec2) {
    let dimVector = vec2;
    let oprVector = vec1;

    if (vec1[0].length < vec2[0].length) {
        dimVector = vec1;
        oprVector = vec2;
    }

    let dimColms = vecChangeDim(dimVector);
    let colmVectorResult = [];

    dimColms.forEach(dimColm => {

        let colmResult = [];

        oprVector.forEach(oprRow => {

            let result = 0;
            
            oprRow.forEach((opr, i) => {

                result += opr * dimColm[i];

            });

            colmResult.push(result);

        });

        colmVectorResult.push(colmResult);

    });

    return vecChangeDim(colmVectorResult);

}

// Runs all values of a matrix though a function
function vecProcess(vec, fn) {

    let returnVec = [];

    vec.forEach((row) => {

        let returnRow = [];

        row.forEach(colm => {

            returnRow.push(fn(colm));

        });

        returnVec.push(returnRow);

    });

    return returnVec;

}

// Changes rows to colms and colms to rows within a matrix
function vecChangeDim(vec) {

    let rowLength = vec[0].length;
    let colms = [];

    for (var i = 1; i <= rowLength; i++) {
        let colm = [];
        vec.forEach(row => {
            colm.push(row[i - 1]);
        });
        colms.push(colm);
    }

    return colms;

}

function basis(veci, vecj) {
    return [veci, vecj];
}

function v(basis, vector) {
    return [basis[0][0] * vector[0] + basis[1][0] * vector[1], basis[0][1] * vector[0] + basis[1][1] * vector[1]];
}

function getDegree(vector) {
    var x = vector[0];
    var y = vector[1];
    var rc = y / x;
    var rad = Math.atan(rc);
    var deg = rad * 180 / Math.PI;

    return deg;
}