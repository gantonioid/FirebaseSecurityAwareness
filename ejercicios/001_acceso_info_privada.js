const fb = require('./fb').default;

/**
 * Prueba de lectura de información del perfil de un usuario
 * reglas iniciales en el nodo Users
 *   ".read": true
 * 
 * Se espera que no se permita lectura libre
 */


const nodo = 'Users';
/**
 * Lectura a un nodo público
 */
const lectura = async () => {
    //Ruta que vamos a leer
    const ref = fb.db.ref(nodo);

    const data = (await ref.once('value')).val();
    console.log('Se leyó', data)
    return data.length;
}

lectura()
    .then((res) => {
        console.log('fin de la prueba');
        process.exit()
    })
    .catch(e => {
        console.log('Error de lectura', e.message);
        process.exit()
    })