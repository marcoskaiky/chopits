import { useCallback, useRef, type SyntheticEvent } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

    const refForm = useRef<any>(null);

    const navigate = useNavigate();

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                email: { value: string }, 
                password: { value: string },
            }

            let objSalvar = {
                email: target.email.value,
                password: target.password.value,
            }

            //usuario vai estar salvo no banco - brinks

            // select - front nao acessa banco.

            axios.post('http://localhost:3001/login', objSalvar)
                .then((resposta) => {

                    localStorage.setItem(
                        'chopits:token',
                        JSON.stringify(resposta.data)
                    )

                    console.log(resposta.data)

                    navigate('/usuarios')
                })
                .catch((err) => {
                    console.log(err)
                    alert('Email ou senha invalidos')
                })

        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])

    return (
        <>
            <div className={styles.main}>
                <div className={styles.border}>
                    <div
                        className="d-flex flex-column align-items-center"
                    >
                        <h1 className="text-primary">Login</h1>
                        <p className="text-secondary">
                            Preencha os campos para logar no sistema!
                        </p>
                    </div>
                    <hr />

                    <form
                        noValidate
                        className="needs-validation g-3 row"
                        ref={refForm}
                        onSubmit={submitForm}
                    >

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
                                className="btn btn-primary"
                                type="submit"
                            >Salvar</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}