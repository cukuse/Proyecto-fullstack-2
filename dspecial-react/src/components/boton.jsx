import '../css/estilo.css';

function Boton({children, onClick}) {
    return (
        <>
        <button onClick={onClick} className='btn-n'>
            {children}
        </button>
        </>
    )
        
    
}
export default Boton