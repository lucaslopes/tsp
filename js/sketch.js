const people = prompt('How many people?')
let groups = []

function setup() {
  initializeScenario()

  while(groups.length > 1) {
    searchFriends()
    connectGroups()
  }

  groups = groups[0].members
  improveFriendships()
  showFriendships()
}

function initializeScenario() {
  createCanvas(windowWidth, windowHeight)
  background(51)

  for (let i = 0; i < people; i++) {
    let newPerson = new Person(
      random(20, width - 20),
      random(20, height - 20), i)

    groups.push(new Group([newPerson]))
    groups[i].members[0].show()
  }
}

function searchFriends() {
  for (let i = 0; i < groups.length; i++)
    groups[i].updateNewMembers()

  for (let i = 0; i < groups.length; i++)
    groups[i].findNewFriend()
}

function connectGroups() {
  let newGroup = []

  for (let i = 0; i < groups.length; i++) {
    if (!groups[i].joint &&
        groups[i].friendRequest()) {

        let newFriendship = groups[i].joinGroup();
        newGroup.push(new Group(newFriendship))
    }
  }

  for (let i = 0; i < groups.length; i++)
    if (!groups[i].joint)
      newGroup.push(new Group(groups[i].members))

  groups = newGroup
}

function improveFriendships() {
  for (let i = 1; i < groups.length - 2; i++) {
    let personAfriend = groups[i - 1]
    let personA       = groups[i]
    let personB       = groups[i + 1]
    let personBfriend = groups[i + 2]

    if ((personAfriend.howFarFrom(personA) +
         personA.howFarFrom(personB) +
         personB.howFarFrom(personBfriend))
         >
        (personAfriend.howFarFrom(personB) +
         personB.howFarFrom(personA) +
         personA.howFarFrom(personBfriend))) {
    [groups[i], groups[i + 1]] = [groups[i + 1], groups[i]] }
  }
}

function showFriendships() {
  stroke(255,0,255)
  noFill()

  beginShape()
  for (let i = 0; i < groups.length; i++)
    vertex(groups[i].position.x, groups[i].position.y)
  endShape()
}
