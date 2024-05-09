const fb = require('./fb').default;
const fakeuser = require('./000_fakeuser')

/**
 * Prueba de escalación de privilegios
 * reglas iniciales en el nodo Users
 *   "$uid": {
 *     	 ".read": "auth.uid == $uid",
 *       ".write": "auth.uid == $uid"
 *     }
 * 
 * Se espera que no me permita editar mi información de permisos, pero tal vez mi nombre o correo sí
 */



const iniciarSesion = async (correo) => {
    const user = await fb.auth.signInWithEmailAndPassword(fakeuser.email, fakeuser.pass);
    return user.user.uid
}

const escalar = async (uid) => {
    //Ruta que vamos a leer
    const nodo = `Users/${uid}/Permiso`;
    const ref = fb.db.ref(nodo);
    await ref.set('admin')
}

iniciarSesion()
    .then((uid) => {
        escalar(uid)
            .then((res) => {
                console.log('permisos cambiados');
                console.log('fin de la prueba');
                process.exit()
            })
    })
    .catch(e => {
        console.log('Error', e.message);
        process.exit()
    })