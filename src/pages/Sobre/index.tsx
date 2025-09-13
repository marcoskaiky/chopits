import { useParams } from "react-router-dom"

export const Sobre = () => {
    const { id } = useParams();

    return(
        <div>
            <h1>Sobre</h1>
            <p>Sobre selecionado: {id}</p>
        </div>
    )
}
