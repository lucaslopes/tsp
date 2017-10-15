function initializeScenario() {
  canvas = createCanvas(windowWidth, windowHeight)
  background(51)

  for (let i = 0; i < people; i++) {
    let newPerson = new Person(
      random(20, width - 20),
      random(20, height - 20), i)

    groups.push(new Group([newPerson]))
    groups[i].members[0].show()
  }
}

function mouse() {
  if (groups.length > 1) {
    searchFriends()
    connectGroups()
  } else {
    groups = groups[0].members
    improveFriendships()
    showFriendships()
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

// function whatTheFirstIndexOf(person) {
//   let initialIndex = person
//   let result = 0
//
//   for (i = 0; i < person; i++)
//     result += initialIndex--
//
//   return result
// }
//
// function whatTheDistanceBetween(personA, personB) {
//   if (personA <= personB)
//     return (whatTheFirstIndexOf(personA) + (personB - personA))
//   else
//     return (whatTheFirstIndexOf(personB) + (personA - personB))
// }

// function theyCross (points) {
//   let distA = points[1].dist(points[0]);
//   let distB = points[3].dist(points[2]);
//   let distances = [];
//
//   for (let i = 0; i < points.length - 1; i++)
//     for (let j = i + 1; j < points.length; j++)
//       distances.push(points[i].dist(points[j]));
//
//   distances.increase();
//
//   if ((distA == distances[distances.length - 1]) ||
//       (distB == distances[distances.length - 1]))
//        return true;
// }

// function crossLines (indices) {
//   let lesserIndex = indices[0];
//   let biggerIndex = indices[0];
//
//   for (let i = 1; i < indices.length; i++) {
//     if (lesserIndex > indices[i]) lesserIndex = indices[i];
//     if (biggerIndex < indices[i]) biggerIndex = indices[i];
//   }
//
//   let actualDist = 0;
//   for (let i = lesserIndex; i < biggerIndex; i++)
//     actualDist += cities[path[i + 1]].pos.dist(cities[path[i]].pos);
//
//   let partition = path.slice(lesserIndex + 1, biggerIndex);
//   partition.reverse();
//
//   let newArray = path.slice();
//   newArray.splice(lesserIndex + 1, (biggerIndex - lesserIndex) - 1, ...partition);
//
//   let newDist = 0;
//   for (let i = lesserIndex; i < biggerIndex; i++)
//     newDist += cities[newArray[i + 1]].pos.dist(cities[newArray[i]].pos);
//
//   if (newDist < actualDist)
//     path = newArray.slice();
// }

// Antes de Adicionar uma nova conexão
//   Verifique se a linha adicionada cruza com alguém
//     Se não cruzar
//       Adicione normalmente
//     Se cruzar:
//       Faça o Swap
//
// Swap:
//   Coloca normalmente
//   Inverte a posição dos extremos (mantém entre eles)
