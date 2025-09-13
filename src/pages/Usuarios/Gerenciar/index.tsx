import axios from "axios";
import { useCallback, useRef, type SyntheticEvent } from "react"

export default function GerenciarUsuarios() {

    const refForm = useRef<any>(null);

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nome: { value: string },
                email: { value: string },
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
            }

            axios.post('http://localhost:3001/usuarios', objSalvar)
            .then(() => {
                alert('Salvo')
            })
            .catch((erro) => {
                console.log(erro)
                alert('Deuruim')
            })

        } else {
            refForm.current.classList.add('was-validated')
        }

        

    }, [])

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
                    <label htmlFor="nome"
                        className="formaLabel"
                    > Nome
                    </label>
                    <input type="text"
                        className="form-control"
                        placeholder="Digite seu nome"
                        id="nome"
                        required

                    />

                    <div className="invalid-feedback">
                        Diga meu nome

                    </div>

                </div>

                <div className="col-md-12">
                    <label htmlFor="email"
                        className="formaLabel"
                    > Email
                    </label>
                    <input type="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        id="email"
                        required

                    />

                    <div className="invalid-feedback">
                        Digite o email ai

                    </div>

                </div>

                <div className="col-md-12">
                    <button className="btn"
                        type="button"
                    >Voltar</button></div>

                <button className="btn btn-primary"
                    type="submit"
                >Salvar</button>

            </form>


        </>
    )
}