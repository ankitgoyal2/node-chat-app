class Users {
    constructor (){
        this.users = [];
    }
    addUser(id,name,room){
        var user = { id,name,room };
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }
    getUser(id){
        var users = this.users.filter((user)=> user.id === id );
        return users[0];
    }
    getUserList(room){
        var users = this.users.filter((user)=> user.room === room );
        var usersName = users.map((user)=> user.name);

        return usersName;
    }
}

module.exports = {
    Users,
}