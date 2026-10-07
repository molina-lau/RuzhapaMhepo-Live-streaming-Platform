export interface TimeTableItem {
    id: string
    desc: string
    endTime: number
    radioId: string
    labelEnd: string
    startTime: number,
    radioLabel: string
    labelStart: string,
}
export interface User {
    role: string
    email: string
    likes: Radio[],
    podcasts : Podcasts[]
    lastName: string
    firstName: string
}
export interface Radio {
    path: string
    _id: string
    likes: number
    picture: string
    radioFM: string
    comments: number
    radioTitle: string
    description: string
    updateLikes: (likes: number) => void
}
export interface Event {
    id: string
    desc: string
    radioId: string
    endTime: number
    labelEnd: string
    startTime: number
    labelStart: string
}

export interface EventsTimeTable {
    week: number
    code: string
    event: Event[]
    radioId: string
    _id: string
    absoluteTime: number
}
export interface CommentInterface {
    tag: string;
    time: number;
    idTag: string;
    email: string;
    message: string;
    // replies?: Comment[];
    lastName: string; // Add parentId for replies
    firstName: string;
}
export interface WeekTable {
    0: EventsTimeTable | null,
    1: EventsTimeTable | null,
    2: EventsTimeTable | null,
    3: EventsTimeTable | null,
    4: EventsTimeTable | null,
    5: EventsTimeTable | null,
    6: EventsTimeTable | null,
}
export interface Podcasts {
    title: string
    _id : string
    picture: string
    website: string
    likes : number
    presenter: string
    description: string
}
export interface UserSession {
    user: User,
    sessionId: string,
}
export interface Recordings{
    path  :  string
	email :  string 
	radio  : Radio  
	radioId: string 
    _id : string
}