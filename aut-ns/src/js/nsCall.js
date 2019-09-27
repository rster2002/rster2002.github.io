const apiToken = "edd6a8d1ce534889ad2f197ae299e407";

function nsCall(endpoint) {
    return new Promise((res, rej) => {
        var headers = new Headers();

        headers.append

        fetch(endpoint, {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Ocp-Apim-Subscription-Key": apiToken
            }
        })
            .then(r => r.json())
            .then(json => res(json));
    });
}

export default nsCall;