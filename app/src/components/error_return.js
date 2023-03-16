import { First } from 'react-bootstrap/esm/PageItem'
import '../static/css/Error.css'

function Error_return(props) {
    return (
        <div className="error-container">
            <div className="error-message">
                <h1>The Product is Fake!</h1>
                <p>We apologize for the inconvenience. Please try again later.</p>
                <a href="/"><button className="btn btn-primary">Go Back</button></a>
            </div>
        </div>
    )
}

export default Error_return
