export class GlobalExports{
    static Phone = `+263 785 653 285`
    static PhoneF = `+263785653285`
    static Listeners = 10000
    static RadioStations = 15
    static Podcasts = 50
    static Email = 'info@cut-fm.co.zw'
    static Address = 'Chinhoyi Zimbabwe'
    
    static Youtube = 'https://www.youtube.com/@molinaphillip1830?si=uY0lYymMxqCBLlpP'
    static Facebook = 'https://www.facebook.com/share/1BNrT5vqkd/'
    static Instagram = 'https://www.instagram.com/molynleigh?igsh=MXJqNnp6MTB5a2RleQ=='
    static Whatsapp = 'https://wa.me/+263785653285?text=Hello,%20CUT-FM!'
    static PodcastTeams : {src : string , name : string , title : string}[] = [
        {
            src: "/assets/img/team/01.jpg",
            name: "Chrispen Mwale",
            title: "Sound Engineer"
        },
        {
            src: "/assets/img/team/02.jpg",
            name: "Moline Sithole",
            title: "DJ/On-Air Personality"
        },
        {
            src: "/assets/img/team/03.jpg",
            name: "Peter Anderson",
            title: "Producer"
        },
        {
            src: "/assets/img/team/04.jpg",
            name: "Shantel Ziva",
            title: "Station Manager"
        }
    ]
    static getImage(source : string) : string{
        return `${process.env.NEXT_PUBLIC_API_}${source}`
    }
}