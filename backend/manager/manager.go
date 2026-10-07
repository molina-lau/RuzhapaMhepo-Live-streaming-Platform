package manager

import (
	"sync"

	"openchains.com/cutfm/database"
	"openchains.com/cutfm/interfaces"
)

var mutextMap = struct {
	sync.Mutex
	data map[string]interfaces.UserSession
}{
	data: make(map[string]interfaces.UserSession),
}

type Manager struct {
	DB *database.Database
}
