export class User {

    public static async getUser(username: string){
        if(username==="wallace") {
            return Promise.resolve({
            firstName: "Wallace",
            lastName: "Berder",
            email: "wberder@gmail.com",
            username: "wallace",
            profilePic: "https://pbs.twimg.com/profile_images/1163541386785746944/A1nz8DcJ_400x400.jpg",
            bio: "My name is Wallace Berder, and I enjoy touring around Europe",
            location: "Moscow, Russia",
            joined: "2019-09-01",
            isAdmin: true,
            reviewCount: 0,
            isOwnProfile: true
        })
        } else {
            return Promise.reject("Username not found")
        }
    }

}
