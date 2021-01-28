import axios from "axios";
export default {
    saveCampsite: function(campsite) {
        return axios.post("/api/campsites", campsite)
    },
    loadCampsite: function(campsite) {
        return axios.get("/api/campsites")
    }
}