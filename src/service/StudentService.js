import remoteService from "./RemoteService";

export default class StudentService {

    static async getAll() {
        let response = (await remoteService.get("students/"));
        return response.data;
    }
    
    static async createStudent(student) {
        let response = (await remoteService.post("students/", student));
        return response;
    }

    static async raiseHand(student) {
        let response = (await remoteService.put("students/", student));
        return response.status;
    }

    static async deleteById(id) {
        let response = (await remoteService.delete("students/" + id));
        return response.status;
    }

}