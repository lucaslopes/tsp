const people = prompt('How many people?')
let groups = []
let canvas

function setup() {
  initializeScenario()
  createGroups()

  while(groups.length > 1) {
   searchFriends()
   connectGroups()
  }

  groups = groups[0].members
  // improveFriendships()
  showFriendships()

  canvas.mouseClicked(mouse);
}
