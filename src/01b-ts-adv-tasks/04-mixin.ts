// Teachable Mixin
import { applyMixins } from "./src/apply-mixins";

class Teachable {
  knowledge: number = 0;

  learn() {
    this.knowledge++;
    console.log('is learning, knowledge', this.knowledge);
  }

}

// Swimmable Mixin
class Swimmable {
  isSwimming: boolean;

  swim() {
    this.isSwimming = true;
    console.log('is swimming', this.isSwimming);
  }
}

// treat classes as interfaces, uses types NOT implementations
class TeachableSwimmer implements Teachable, Swimmable {
  constructor() {
    console.log('new TeachableSwimmer, current knowledge', this.knowledge);
  }

  learnToSwim() {
    this.learn();
    this.swim();
  }

  // Teachable
  knowledge: number = 10;
  learn: () => void;

  // Swimmable
  isSwimming: boolean = false;
  swim: () => void;
}

// apply mixins
applyMixins(TeachableSwimmer, [Teachable, Swimmable]);

function mixinsExample() {
  let smartSwimmer = new TeachableSwimmer();
  smartSwimmer.learnToSwim();

}

export function mixinsApp() {
  // mixinsExample();
}

