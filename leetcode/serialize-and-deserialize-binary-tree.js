function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const nullVal = '#'
const endMark = ','

// 先序遍历
function traverseTree(root, fn) {
  if (root === null) {
    fn(null)
    return
  }
  const left = root.left
  const right = root.right
  fn(root.val)
  traverseTree(left, fn)
  traverseTree(right, fn)
}

function valToString(val) {
  if (val === null) {
    return nullVal
  } else if (typeof val === 'number') {
    return val
  } else if (typeof val === 'string') {
    return encodeURIComponent(val)
  } else {
    throw new Error('unexpected type')
  }
}

function stringToVal(str) {
  if (str === nullVal) {
    return null
  } else if (typeof str === 'number') {
    return Number(str)
  } else if (typeof str === 'string') {
    return decodeURIComponent(str)
  } else {
    throw new Error('unexpected type')
  }
}

function serialize(root) {
  const arr = []
  traverseTree(root, function (val) {
    arr.push(valToString(val))
  })
  return arr.join(endMark)
}

function deserialize(str) {
  const nodes = str.split(endMark)
  function _deserialize(arr) {
    if (arr.length === 0) {
      return null
    }
    const val = stringToVal(arr.shift())
    if (val === null) return null
    const root = new TreeNode(val)
    root.left = _deserialize(arr)
    root.right = _deserialize(arr)
    return root
  }
  return _deserialize(nodes)
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.right.left = new TreeNode(4)
root.right.right = new TreeNode(5)

const str = serialize(root)
console.log(str)
console.log(deserialize(str))
