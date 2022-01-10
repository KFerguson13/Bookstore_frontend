import './NotFound.css';

/** If the user attempts to find a page that doesn't exist, the information below is returned. */
const NotFound = () => {
    return (
        <div className = "mt-2 text-center">  
            <section className = "bg-dark">
                <h1 className = "notFound"> PAGE NOT FOUND </h1>
            </section> 
        </div>
    );
}

export default NotFound;