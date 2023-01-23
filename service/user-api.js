
class UserAPI {
    static loginUser(body){
        return fetch(`http://192.168.0.95:8000/auth/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static registerUser(body){
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/users/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static getUser(user_id, token){
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/users/${user_id}/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            }
        }).then(resp => resp.json())
    }

    static getPerson(user_id, body, token){
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/persons/${user_id}/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 

    static getUserPersons(user_id, token){
        console.log("Get User Persons "+token);
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/users/${user_id}/persons/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            }
        }).then(resp => resp.json())
    } 
    
    static createPerson(user_id, body, token){
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/persons/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 

    static updatePerson(person_id, body, token){
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/persons/${person_id}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 

    static createChild(user_id, body, token){
        console.log("Body ", body);
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/persons/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 

    static createTask(user_id, body, token){
        console.log("Body ", body);
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/tasks/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 

    static getUserTasks(user_id, token){
        console.log("Get User Persons "+token);
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/users/${user_id}/persons/`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            }
        }).then(resp => resp.json())
    } 

    static updateTask(task_id, body, token){
        console.log("Body ", body);
        return fetch(`http://192.168.0.95:8000/whenuneedmeapi/tasks/${task_id}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 


    static updateUser(user_id, body, token){
        return fetch(`${process.env.REACT_APP_API_URL}/whenuneedmeapi/users/${user_id}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}

export default UserAPI 