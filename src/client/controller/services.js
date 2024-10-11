//import { collection, getDoc, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import firebase from '../firebase.js'
import { getDoc, setDoc, doc, updateDoc } from 'firebase/firestore/lite'
import { auth } from '../firebase'
import { ficha_default } from '../defaults/ficha'
import { ERROR_FIREBASE } from './parameters.js'

/**
 * SERVICES
 *
 * Api utilizada para consultar la base de datos de Firebase
 */
class Services {
	async initUser(user) {
		await setDoc(doc(firebase, user, 'datos'), {})
		await setDoc(doc(firebase, user, 'ficha'), ficha_default)
	}

	async updateFicha(data) {
		try {
			return updateDoc(doc(firebase, auth.currentUser.email, 'ficha'), data)
		} catch (err) {
			throw new Error(ERROR_FIREBASE.ERROR_BASE + err)
		}
	}

	async getFicha() {
		try {
			const ficha_data = await getDoc(doc(firebase, auth.currentUser.email, 'ficha'))
			return ficha_data.data()
		} catch (err) {
			throw new Error(ERROR_FIREBASE.ERROR_BASE + err)
		}
	}
}

export default new Services()
