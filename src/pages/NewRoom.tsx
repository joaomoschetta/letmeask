// import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

// Images
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

// Components and hooks
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

// Style
import '../styles/auth.scss';


export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [ newRoom, setNewRoom ] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    console.log('1')
    history.push(`/admin/rooms/${firebaseRoom.key}`);
    console.log('2')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let me ask" />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={ handleCreateRoom }>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}