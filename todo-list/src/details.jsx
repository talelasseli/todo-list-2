import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Todo from "./Todo.jsx";
const Details = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`http://localhost:5000/todos/${id}`);
    return ( 
        <div className="Details">
           {loading && <p>Loading...</p>}
           {data && <Todo data={data} />}
           {error && <p>Error: {error.message}</p>}
        </div>
     );
}

export default Details;