import axios from "axios"
import { API_URL } from "../../constants/API";


export const getNewArrival = () => {
    return async dispatch => {
        try {
            const newArrival = await axios.get(`${API_URL}/products?newArrival=new`)
            dispatch({
                type: "NEW_ARRIVAL",
                payload: newArrival.data,
            });


        } catch (error) {
            alert(error)
        }
    }
}

