import { useSelector } from "react-redux";
import GoogleMaps from "simple-react-google-maps"
export default function Maps() {
    
    const ubicacion = useSelector((state) => state.allFlight);

return (
    <div data-aos="fade-up">
    <GoogleMaps 
    apiKey = {process.env.REACT_APP_API_KEY}
    style={{height: "250px", width: "700px"}}
    zoom = {1.3}
    center= {{
        lat: 10,
        lng: 0
    }}
    markers={[
        {lat: ubicacion.origin.latO, lng: ubicacion.origin.lngO},
        {lat: ubicacion.destination.latD, lng: ubicacion.destination.lngD},
    ]}
    /></div>
)
}
