export default class BinaryTreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  addLeft(data){
    this.left = new BinaryTreeNode(data);
    return this;
  }
  addRight(data){
    this.right = new BinaryTreeNode(data);
    return this;
  }
}