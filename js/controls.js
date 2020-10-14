import { Tool } from './tool.js';

class Controls {
  constructor(domElement) {
    this.domElement = domElement;
    this.activeTool = new Tool(this.domElement);
  }

  update = () => {
    this.activeTool.update();
  }
}

export { Controls }