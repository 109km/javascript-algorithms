function clone(parent, circular, depth, prototype) {
  const allParents = []
  const allChildren = []

  // set default parameters
  if (getDataType(circular) === 'undefined') {
    circular = true
  }
  if (getDataType('depth') === 'undefined') {
    depth = Infinity
  }

  function _clone(parent, depth) {
    // get the object type
    const type = getDataType(obj)

    // Primitive types and functions.
    if (typeof parent !== 'object') {
      return parent
    }

    if (depth === 0) {
      return parent
    }

    let child
    let proto
    if (type === 'date') {
      child = new Date(parent.getTime())
    } else if (type === 'regexp') {
      child = new RegExp(parent.source, parent.flags)
    } else if (type === 'array') {
      child = []
    } else if (type === 'object') {
      if (prototype) {
        child = Object.create(prototype)
        proto = prototype
      } else {
        proto = Object.getPrototypeOf(parent)
        child = Object.create(proto)
      }
    } else {
      // TODO: handle other types like Map, Set, etc.
    }

    if (circular) {
      let index = allParents.indexOf(parent)

      // Circular reference found, return the child directly
      if (index > -1) {
        return allChildren[index]
      }
      allParents.push(parent)
      allChildren.push(child)
    }

    for (let key in parent) {
      try {
        child[key] = _clone(parent[key], depth - 1)
      } catch (e) {
        console.error(e)
        continue
      }
    }
    return child
  }
  return _clone(parent, depth)
}

function getDataType(o) {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
}
