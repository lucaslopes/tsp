class Group {
  constructor(person) {
    this.members = person
    this.newMembers = []
    this.joint = false
    this.friend = [
      // my position,
      // friend's group,
      // friend's position
    ]
  }

  updateNewMembers() {
    this.newMembers = []

    for (let i = 0; i < this.members.length; i++)
      if (this.members[i].friends.length < 2)
        this.newMembers.push(i)
  }

  findNewFriend() {
    let closer = Infinity
    let friend = []

    for (let i = 0; i < this.newMembers.length; i++) {
    for (let j = 0; j < groups.length; j++) {
    if  (this != groups[j]) {
    for (let k = 0; k < groups[j].newMembers.length; k++) {

      let distance =
        this.members[this.newMembers[i]].howFarFrom(
        groups[j].members[groups[j].newMembers[k]])

      if (closer > distance) {
        closer = distance
        friend = [
          this.newMembers[i],
          j,
          groups[j].newMembers[k]
        ]
      }

    } } } } // testar

    this.friend = friend
  }

  friendRequest() {
    if (groups.indexOf(this) ==
        groups[this.friend[1]].friend[1]
        &&
        this.friend[0] ==
        groups[this.friend[1]].friend[2])
    return true
    else return false
  }

  joinGroup() {
    let newGroup = []
    let myIndex = this.friend[0]
    let friend = groups[this.friend[1]]
    let friendIndex = friend.friend[0]

    switch (true) {
      case (myIndex > 0 && friendIndex == 0): // A + B
        newGroup = this.members.concat(friend.members)
        break;

      case (myIndex == 0 && friendIndex == 0): // A' + B
        this.members.reverse()
        newGroup = this.members.concat(friend.members)
        this.members.reverse()
        break;

      case (myIndex == 0 && friendIndex > 0): // B + A
        newGroup = friend.members.concat(this.members)
        break;

      case (myIndex > 0 && friendIndex > 0): // B'+ A
        this.members.reverse()
        newGroup = friend.members.concat(this.members)
        this.members.reverse()
        break;
    }

    this.joint = true
    friend.joint = true

    this.members[myIndex].friends.push(friendIndex)
    friend.members[friendIndex].friends.push(myIndex)
    
    return newGroup
  }
}
