import { useParams } from "react-router-dom"

export const Categorias = () => {
    const { id } = useParams();

    return (
        <>
            <h1>Categorias {id}</h1>
        </>
    )
}