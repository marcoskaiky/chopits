import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarUsuarios() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)

    useEffect(() => {
        const idUser = Number(id)
        console.log(idUser);

        if (!isNaN(idUser)) {
            console.log('é numero')
            setIsEditar(true)

            axios.get(`http://localhost:3001/users?id=${idUser}`)
                .then(({ data }) => {
                    refForm.current['nome'].value = data[0].nome
                    refForm.current['email'].value = data[0].email
                })
                .catch((erro) => {
                    console.log(erro)
                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nome: { value: string },
                email: { value: string },
                permissoes: { value: string },
                password: { value: string },
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
                permissoes: target.permissoes.value,
                password: target.password.value,
            }

            if (isEditar) {
                console.log('esta editando');

                axios.put('http://localhost:3001/users/' + id, objSalvar)
                    .then(() => {
                        alert('Editado com sucesso.')
                        navigate('/usuarios')

                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            } else {
                console.log('esta criando');
                axios.post('http://localhost:3001/users', objSalvar)
                    .then(() => {
                        alert('Salvo que alegria :D')
                        navigate('/usuarios')
                    })
                    .catch((erro) => {
                        console.log(erro)
                        alert('deu ruim que triste :(')
                    })
            }


        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [isEditar, id])

    return (
        <>
            <h1>Usuario</h1>

            <form
                noValidate
                className="needs-validation g-3 row"
                ref={refForm}
                onSubmit={submitForm}
            >
                <div className="col-md-12">
                    <label
                        htmlFor="nome"
                        className="formLabel"
                    >
                        Nome
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite seu nome"
                        id="nome"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor digite seu nome.
                    </div>
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="email"
                        className="formLabel"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        id="email"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor digite seu email.
                    </div>
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="permissoes"
                        className="formLabel"
                    >
                        Tipo
                    </label>
                    <select
                        className="form-select"
                        defaultValue={""}
                        id="permissoes"
                        required
                    >
                        <option value={""}>Selecione o Tipo</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"colaborador"}>Colaborador</option>
                    </select>
                    <div className="invalid-feedback">
                        Por favor selecione uma permissão.
                    </div>
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="password"
                        className="formLabel"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        id="password"
                        required
                    />
                    <div className="invalid-feedback">
                        Por favor digite sua senha.
                    </div>
                </div>

                <div className="col-md-12">

                    <button
                        className="btn"
                        type="button"
                    >Voltar</button>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >Salvar</button>
                </div>

            </form>
        </>
    )
}