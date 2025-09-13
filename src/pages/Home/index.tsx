import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FaClipboardList, FaRegUser, FaRegFolderOpen } from 'react-icons/fa'
import { IoIosAddCircleOutline } from "react-icons/io";

export const Home = () => {
    const navigate = useNavigate();
    const [tarefas, setTarefas] = useState<string[]>([]); //Cria o Array de String
    const [novaTarefa, setNovaTarefa] = useState("");  //Guarda o oque o usuario digitar 

    useEffect(() => {
        const tarefasSalvas = localStorage.getItem('tarefas'); // Busca no localStorage as tarefas salvas
        if (tarefasSalvas) {

            setTarefas(JSON.parse(tarefasSalvas));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);


    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== "") { // o trim remove os espacos apos a digitacao
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa("");
        }
    };
    
    
    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '600px', 
            margin: '0 auto' ,
            
        }}>
            
            
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '20px' 
            }}>
                <button 
                    onClick={() => navigate('/categorias/1')} 
                    style={{ 
                        margin: '5px', 
                        padding: '10px 20px', 
                        backgroundColor: '#b8173aff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }}
                >
                    Categorias <FaClipboardList />
                </button>
                <button 
                    onClick={() => navigate('/usuarios')} 
                    style={{ 
                        margin: '5px', 
                        padding: '10px 20px', 
                        backgroundColor: '#b8173aff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }}
                >
                    Usuários <FaRegUser />
                </button>
                <button 
                    onClick={() => navigate('/sobre/1')} 
                    style={{ 
                        margin: '5px', 
                        padding: '10px 20px', 
                        backgroundColor: '#b8173aff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }}
                >
                    Sobre   <FaRegFolderOpen />
                </button>
            </div>

            <div style={{ 
                backgroundColor: '#f8f8f8ff', 
                padding: '20px', 
                borderRadius: '6px' 
            }}>
                
                <input
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    placeholder="Digite uma tarefa"
                    style={{ 
                        padding: '10px', 
                        width: '70%', 
                        border: '1px solid #ddd', 
                        borderRadius: '4px', 
                        marginRight: '10px' 
                    }}
                />
                <button 
                    onClick={adicionarTarefa} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#b8173aff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px' 
                    }}
                >
                    Adicionar  <IoIosAddCircleOutline />
                </button>

                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    marginTop: '50px' 
                }}>
                    {tarefas.map((tarefa, index) => (
                        <li 
                            key={index} 
                            style={{ 
                                padding: '8px', 
                                marginBottom: '5px', 
                                backgroundColor: '#f7e4e9ff', 
                                borderRadius: '4px', 
                                textAlign: 'center'

                                 
                            }}
                        >
                            {tarefa}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
