import {initializeApp} from 'firebase/app'
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from 'firebase/firestore'
import { useEffect, useState } from 'react';

const firebaseApp = initializeApp( {
  apiKey: "AIzaSyAEnJdHZF-szgO_sga23IXxeF-v1eSqf34",
  authDomain: "react-firebase-a4a8c.firebaseapp.com",
  projectId: "react-firebase-a4a8c",
});

export const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp)
  const userCollectionRef = collection(db, 'users')

  async function criarUser() {
    const user = await addDoc(userCollectionRef, {
      name, 
      email,
    })
    console.log(user)
  }

  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(userCollectionRef)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, [])

  async function deleteUser(id) {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
  }
  
  return (
    <div>
      <div className='inputs'>
        <h1>Criar Usuário</h1>
        <input type="text" placeholder='Nome...' value={name} onChange={e => setName(e.target.value)}/>
        <input type="text" placeholder='Email...' value={email} onChange={e => setEmail(e.target.value)}/>
        <button onClick={criarUser}>Criar Usuário</button>
      </div>

      <div className='separator'></div>

      <ul>
        <>
          <h1>Lista de Usuários</h1>
        </>
        {users.map(user => {
          return (
            <div key={user.id} className='userInfo'>
              <li>Nome: {user.name}</li>
              <li>Email: {user.email}</li>
              <button onClick={() => deleteUser(user.id)}>Deletar usuario</button>
            </div>
          )
        })}
      </ul>
    </div>
  )
}