const fb = require('./fb').default;
const fakeuser = require('./000_fakeuser')

/**
 * Prueba de lectura de información del perfil de un usuario
 * reglas iniciales en el nodo Users
 *   ".read": "auth.uid != null"
 * 
 * Se espera que no me permita leer la información de un usuario "que no sea yo"
 */


const nodo = 'Users';

const iniciarSesion = async (correo) => {
    await fb.auth.signInWithEmailAndPassword(fakeuser.email, fakeuser.pass);
}

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

iniciarSesion()
    .then(() => {
        lectura()
            .then((res) => {
                console.log('fin de la prueba');
                process.exit()
            })
    })
    .catch(e => {
        console.log('Error', e.message);
        process.exit()
    })