import { CommentInterface, EventsTimeTable, Radio, User, UserSession } from "@/types/types";
import { DecodeEvents } from "./decode-e";
import { useUserState } from "@/stores/user-state";
import { showErrorToast } from "./time-ops";

export const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = btoa(`${Date.now()}-${Math.random().toString(36)}`);
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
};
export const saveUserToLocalStorage = (user: User): void => {
    if(!user.email) return showErrorToast("user invalid")
    const userData = {
        ...user,
    };
    localStorage.setItem('user_data', JSON.stringify(userData));
};
export const saveSessionToLocalStorage = (id: string): void => {
    localStorage.setItem('xpk', id);
};
export const getSession = () => {
    return localStorage.getItem('xpk') ?? '';
}
export const clearUserSession = ()=>{
    localStorage.clear()
}
export const getAllRadios = async (page: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/get?page=${page}`, {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("radios", JSON.stringify(data.radios))
            return data;
        }
        return "There was an error ";
    } catch {
        return "Another error";
    }
}
export const getRadio = async (q: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/get/one?id=${q}`, {
            method: 'GET',
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getSortedEvents = async (q: string, time: number): Promise<EventsTimeTable[]> => {
    const response = await getEvents(q, time);
    let list: EventsTimeTable[] = []
    if (typeof response !== 'string') {
        list = await response;
    }
    return DecodeEvents(list)
}
export const getEvents = async (q: string, time: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/schedule?id=${q}&time=${time}`, {
            method: 'GET',
        });
        if (response.ok) {
            const k = await response.json()
            return k;
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getListToRadios = (): Radio[] => {
    const item = localStorage.getItem("radios")
    if (item) {
        return JSON.parse(item)
    }
    return []
}
export const likeRadio = async (q: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/like?id=${q}`, {
            method: 'GET',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
            },
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const likePodcast = async (q: string)  => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}podcast/like?id=${q}`, {
            method: 'GET',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
            },
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const InitUser = () => {
    const localUser = localStorage.getItem('user_data');
    if (localUser) {
        const user = JSON.parse(localUser)
        if(!user.email){
            localStorage.removeItem('user_data');
            return showErrorToast("user was not found");
        }
        useUserState.setState(user)
        return user
    }

}
export const postCommentOnline = async (q: CommentInterface) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/comment`, {
            method: 'POST',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(q),
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getCommentsOnline = async (q: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/comment/get?id=${q}`, {
            method: 'GET',
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getAllPodcasts = async (page: number, query : string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}podcast/get?page=${page}&q=${query}`, {
            method: 'GET',
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getAllRadiosByQuery = async (q: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/query?q=${q}`, {
            method: 'GET',
        });
        if (response.ok) {
            return await response.json();
        }
        return false;
    } catch {
        return false;
    }
}
export const startRecording = async (q: Radio) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/record`, {
            method: 'POST',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(q),
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const refreshSession = async (q: UserSession) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/record/sync`, {
            method: 'POST',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(q),
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const stopSession = async (q: UserSession) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/record/stop`, {
            method: 'POST',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(q),
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const getRecordings = async (page : number, radioId : string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/record/get?page=${page}&radioId=${radioId}`, {
            method: 'GET',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}
export const deleteAudioRecord = async (q: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}radio/record/delete?id=${q}`, {
            method: 'POST',
            headers: {
                "Authorization": getSession(),
                "x-device-id": getDeviceId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(q),
        });
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 400) {
            const { message } = await response.json();
            return message;
        }
        return `There was error ${response.status}`;
    } catch (e) {
        return `There was error : ${e}`
    }
}