/**
 * Dado um URL de uma página, separa a query em um objeto.
 * Examplo: "/?page=2&sort=asc&limit=10" => { page: '2', sort: 'asc', limit: '10' }
 * @param {*} paramsArray 
 * @returns objeto com as respetivas keys e values da quey da página
 */
const sliceQueryPageURL = (paramsArray) => {
    
    const params = {};
    paramsArray.forEach(param => {
        const [key, value] = param.split('=');
        params[key] = value;
    });

    return params;
}

export default sliceQueryPageURL;