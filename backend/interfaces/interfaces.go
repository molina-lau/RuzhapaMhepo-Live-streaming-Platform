package interfaces

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Role              string      `json:"role" bson:"role"`
	Likes             []Radio     `json:"likes" bson:"likes"`
	Email             string      `json:"email" bson:"email"`
	LastName          string      `json:"lastName" bson:"lastName"`
	Password          string      `json:"password" bson:"password"`
	Podcasts          []PodCaster `json:"podcasts" bson:"podcasts"`
	Name              string      `json:"firstName" bson:"firstName"`
	EncrypterPassword []byte      `json:"epassword,omitempty" bson:"epassword"`
}
type Message struct {
	Message string `json:"message"`
	Payload any    `json:"payload"`
}
type Radio struct {
	SearchQuery       string             `bson:"query" json:"-"`
	Path              string             `json:"path" bson:"path"`
	Likes             int64              `bson:"likes" json:"likes"`
	PictureActualPath string             `bson:"picturePath" json:"-"`
	Picture           string             `bson:"picture" json:"picture"`
	FmChannel         string             `bson:"radioFM" json:"radioFM"`
	Comments          int64              `bson:"comments" json:"comments"`
	Id                primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Title             string             `bson:"radioTitle" json:"radioTitle"`
	Description       string             `bson:"description" json:"description"`
}
type Event struct {
	Id         string `json:"id" bson:"id"`
	Desc       string `json:"desc" bson:"desc"`
	RadioId    string `json:"radioId" bson:"radioId"`
	EndTime    int64  `json:"endTime" bson:"endTime"`
	LabelEnd   string `json:"labelEnd" bson:"labelEnd"`
	StartTime  int64  `json:"startTime" bson:"startTime"`
	LabelStart string `json:"labelStart" bson:"labelStart"`
}

type EventsTimeTable struct {
	DayOfWeek    int                `bson:"-" json:"week"`
	DateCode     string             `bson:"code" json:"code"`
	Events       []Event            `json:"event" bson:"event"`
	RadioId      string             `bson:"radioId" json:"radioId"`
	Id           primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	AbsoluteTime int64              `bson:"absoluteTime" json:"absoluteTime"`
}
type Comment struct {
	Tag          string `json:"tag" bson:"tag"`
	Time         int64  `json:"time" bson:"time"`
	CommentIdTag string `json:"idTag" bson:"idTag"`
	Email        string `json:"email" bson:"email"`
	Message      string `json:"message" bson:"message"`
	LastName     string `json:"lastName" bson:"lastName"`
	FirstName    string `json:"firstName" bson:"firstName"`
}
type PodCaster struct {
	Title             string             `json:"title" bson:"title"`
	PictureActualPath string             `bson:"picturePath" json:"-"`
	Likes             int64              `bson:"likes" json:"likes"`
	Website           string             `json:"website" bson:"website"`
	Picture           string             `bson:"picture" json:"picture"`
	Id                primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Presenter         string             `json:"presenter" bson:"presenter"`
	Description       string             `json:"description" bson:"description"`
}

type ListenerObserver struct {
	Radio Radio `json:"radio" bson:"radio"`
}
type UserSession struct {
	User      *User
	Counter   int64
	SessionId string
	Stop      bool
}
type Recording struct {
	Id       string `json:"_id" bson:"_id,omitempty"`
	FullPath string `json:"fullPath" bson:"fullPath"`
	Path     string `json:"path" bson:"path"`
	Email    string `json:"email" bson:"email"`
	Radio    Radio  `json:"radio" bson:"radio"`
	RadioId  string `json:"radioId" bson:"radioId"`
}
