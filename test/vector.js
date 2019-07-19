function vec2(a, b) { return [a, b] }

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