
export const Ajax = async (url, method, dataSaved = '', files = false) => {
    //funcion de peticion ajax
    let loading = true;
    let options = { method: 'GET' };//metodo por defecto
    if (method === 'GET' || method === 'DELETE') {
        options = {
            method: method
        };
    }
    if (method === 'POST' || method === 'PUT') {
        //let body = JSON.stringify(dataSaved);
        if (files) {
            options = {
                method: method,
                body: dataSaved
            };
        } else {
            options = {
                method: method,
                body: JSON.stringify(dataSaved),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    }
    const petition = await fetch(url, options);
    const datas = await petition.json();
    loading = false;
    return {
        datas, loading
    }
}