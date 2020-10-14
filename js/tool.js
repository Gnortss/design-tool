
// Abstract class which all tools will be built from
// Contains core functionalities for a tool
class Tool {
  constructor(domElement) {
    this.domElement = domElement;
    this.initialize();
  }

  update = () => {}

  reset = () => {}

  onMouseDown = (e) => {
    console.log('click');
  }

  contextmenu = (e) => {
    e.preventDefault();
    console.log('right click');
  }

  onPointerDown = (e) => {
    switch(e.pointerType) {
      case 'mouse':
        this.onMouseDown(e);
        break;
    }
  }

  mousewheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('scrolling');
  }

  initialize = () => {
    this.domElement.addEventListener('contextmenu', this.contextmenu, false);
    this.domElement.addEventListener('pointerdown', this.onPointerDown, false);
    this.domElement.addEventListener('wheel', this.mousewheel, false);
  }

  dispose = () => {
    this.domElement.removeEventListener('contextmenu', this.contextmenu, false);
    this.domElement.removeEventListener('pointerdown', this.onPointerDown, false);
    this.domElement.removeEventListener('wheel', this.mousewheel, false);
  }
}

export { Tool }