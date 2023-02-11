interface HtmlElement {
  __toString(): string;
  getName(): string;
}

class InputText implements HtmlElement {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  __toString() {
    return `<input type="text" id="${this.name}" name="${this.name}" />`;
  }
}

abstract class HtmlDecorator implements HtmlElement {
  protected element: HtmlElement;

  constructor(element: HtmlElement) {
    this.element = element;
  }

  getName(): string {
    return this.element.getName();
  }

  __toString(): string {
    return this.element.__toString();
  }
}

class LabelDecorator extends HtmlDecorator {
  protected label: any;
  setLabel(label: string) {
    this.label = label;
  }
  __toString() {
    const name = this.getName();
    return `
              <label for="${name}">${this.label}</label>
              ${this.element.__toString()}
          `;
  }
}

class ErrorDecorator extends HtmlDecorator {
  protected error: any;
  setError(message: string) {
    this.error = message;
  }
  __toString() {
    return `
              ${this.element.__toString()}
              <span>${this.error}</span>
          `;
  }
}

const input = new InputText("nickname");
console.log(`InputText without decorator: ${input.__toString()}`);

const labelled = new LabelDecorator(input);
labelled.setLabel("Nickname:");
console.log(`InputText with LabelDecorator:${labelled.__toString()}`);

const error = new ErrorDecorator(input);
error.setError("You must enter a unique nickname");
console.log(`InputText with ErrorDecorator:${error.__toString()}`);

// Label + Error
const labelledError = new ErrorDecorator(labelled);
labelledError.setError("You must enter a unique nickname");
console.log(
  `InputText with LabelDecorator and ErrorDecorator:${labelledError.__toString()}`
);
