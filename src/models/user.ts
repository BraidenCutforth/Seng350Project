export class User {

    public async getUser(username: string){
        return Promise.resolve({
            firstname: "Wallace",
            lastname: "Berder",
            email: "wberder@gmail.com",
            username: "wallace",
            profile_pic: "/images/:id",
            bio: "My name is Wallace Berder, and I enjoy touring around Eurom",
            location: "Moscow, Russia",
            joined: "2019-09-01",
            isAdmin: true
        })
    }

}
