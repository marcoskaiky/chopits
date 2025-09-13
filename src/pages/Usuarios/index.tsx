import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaPen, FaTrash } from 'react-icons/fa'

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
}

export const Usuarios = () => {

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([])

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        axios.get('http://localhost:3001/usuarios')
            .then((resposta) => {
                console.log(resposta.data)

                setUsuarios(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}
            >
                <h1>Usuarios</h1>
                <button
                    type="button"
                    className="btn btn-success"
                >
                    Adicionar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="submit"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}