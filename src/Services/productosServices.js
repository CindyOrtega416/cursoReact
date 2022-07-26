import firebase from "../Config/firebase"


export async function doesUserNameExist(username) {
    const result = await firebase //vamos a firebase que está en la carpeta Config
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map(user => user.data().length > 0)
}

// get user from the firestore where userId === userId (pasado del auth)
export async function getUserById(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getAllProductos(buscar){
    // return instance.get("sites/MLA/search?q=ipod")
    // return fetch("https://api.mercadolibre.com/sites/MLA/search?q="+buscar)
    // .then(res=>res.json())
    const querySnapshot = await firebase.firestore().collection("productos")
    .get()
    return querySnapshot.docs
}
export async function getByIdProductos(id){
    // return fetch("https://api.mercadolibre.com/items/"+id)
    // .then(res=>res.json())
    const querySnapshot = await firebase.firestore().doc("productos/"+id).get()
    return querySnapshot
}
export async function update(id,body){
    const querySnapshot = await firebase.firestore().doc("productos/"+id).set(body)
    return querySnapshot
}
export async function deleteProducto(id){
    const querySnapshot = await firebase.firestore().doc("productos/"+id).delete()
    return querySnapshot
}