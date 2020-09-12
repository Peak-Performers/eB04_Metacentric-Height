window.model = {
    inputValueA: '', // user input W.
    inputValueB: '', // user input w.
    inputValueC: '', // user input tan(angle).
    inputValueD:'', // user input displacement
    metacentricHeight: 0, // metacentricHeight that compute by computeSum method.
    width: 1, //width of executing one step.
    //  computeSum: compute metacentricHeight of floating object
    computeSum: function () {
        this.metacentricHeight = this.metacentricHeight + ((this.inputValueB*this.inputValueD)/((this.inputValueA+this.inputValueB)*(this.inputValueC))) * this.width;
    }
}


window.view ={
    metacentricHeight: 0, //  round up the metacentricHeight(model.metacentricHeight) value to 2 decimal points.
    canvasContext: '', // canvasContext have many properties and methods for drawing paths, boxes, circles, text, images, and more.
    canvas: new Object(), // Object value of canvas.
    currentSiblingElement: new Object(), //  Object value of current sibling.
    nextSiblingElement: new Object(), //  Object value of next sibling.
    // addClickEvent: add EventListener to other methods.

    addClickEvent: function (id, method) {
        var element = document.getElementById(id);
        element.addEventListener('click', method, false);
    },
    // activateEvents: calls addClickEvent method to add EventListener to other methods.
    activateEvents: function () {
    this.addClickEvent('okBtnId', function() { view.validationInput() });
    this.addClickEvent('startBtnId', function() { view.startExperiment() });
    this.addClickEvent('nextBtnId', function() { view.plotCanvas() });
    this.addClickEvent('stopBtnId', function() { view.stopExperiment() });
},
    // getValue: return value from element.
    getValue: function (id) {
        var value = document.getElementById(id).value;
        return value;
    },
    // setValue: set given value to a element. //todo use if required
    setValue: function (id, valueToSet) {
        document.getElementById(id).value = valueToSet;
    },
    // getElementByClass: return element by given class name.
    getElementByClass: function (className) {
        var element = document.getElementsByClassName(className);
        return element[0];
    },
    // getNextSiblingElement: return next sibling element.
    getNextSiblingElement: function (element) {
        var nextSiblingElement = element.nextSibling;
        nextSiblingElement = nextSiblingElement.nextSibling;
        return nextSiblingElement;
    },
    // disableElement: makes element disable.
    disableElement: function(Id) {
        document.getElementById(Id).disabled = true;
    },
    // enableElement: makes element enable.
    enableElement: function(Id) {
        document.getElementById(Id).disabled = false;
    },
    // replaceElement: replace one element by another element.
    replaceElement: function (id1, id2) {
        document.getElementById(id1).style.display = 'none';
        document.getElementById(id2).style.display = 'block';
    },
    // changeClass: changes class name of a element.
    changeClass: function(id, className) {
        document.getElementById(id).className = className
    },

    // applyColorClass: adds new color class to a element.
    applyColorClass: function (id, colorClass) {
        document.getElementById(id).classList.add(colorClass);
    },
    // removeColorClass: removes color class from element.
    removeColorClass: function (id, colorClass) {
        document.getElementById(id).classList.remove(colorClass);
    },
    // executionWithColour: shows execution of code by changing color in code Content.
    executionWithColour: function () {
        this.removeColorClass(this.currentSiblingElement.id, 'redClass');
        this.applyColorClass(this.nextSiblingElement.id, 'redClass');
    },
    // changePropertyOfElements: changes property of elemants with enableElement, disableElement and changeClass.
    changePropertyOfElements: function () {
        this.enableElement('startBtnId');
        this.disableElement('okBtnId');
        this.disableElement('valueA');
        this.disableElement('valueB');
        this.changeClass('okBtnId', 'buttonDisable startButton');
        this.changeClass('startBtnId', 'button myStartButton');
    },
    // setInnerHtml: set innerText to a element. // todo call if required
    setInnerHtml: function (id, innerHTML) {
        document.getElementById(id).innerHTML = innerHTML;
    },
    // resetVariables: reset all variables to it's initial state.
    resetVariables: function () {
        model.inputValueC = '';
        model.inputValueD = '';
        model.metacentricHeight = 0;
        this.metacentricHeight = 0;
    },
    // resetTextFieldValue: reset text field to their initial state.
    resetTextFieldValue: function () {
        this.setValue('valueD', 0);
    },
    // resetButtonAndTextField: reset button it's initial state and do text field enable.
    resetButtonAndTextField: function () {
        this.replaceElement('stopBtnId', 'startBtnId');
        this.enableElement('valueA');
        this.enableElement('valueB');
        this.enableElement('okBtnId');
        this.disableElement('nextBtnId');
        this.disableElement('stopBtnId');
        this.changeClass('okBtnId', 'button startButton');
        this.changeClass('startBtnId', 'buttonDisable myStartButton');
        this.changeClass('stopBtnId', 'buttonDisable startButton');
        this.changeClass('nextBtnId', 'buttonDisable nextButton');
    },
    // endOfExecution: work at end of code execution and with stop button to reset whole experiment at it's initial state.
    endOfExecution: function () {
        //this.clearOutputValues();  todo call if use it
        this.resetVariables();
        this.resetTextFieldValue();
        this.resetButtonAndTextField();
        var idOfRedText = this.getElementByClass('redClass').id;
        this.removeColorClass(idOfRedText, 'redClass');
    },
    //todo clean
    // clearOutputValues: clear all output values that displayed during the execution.
    /*clearOutputValues: function () {
        this.setInnerHtml('vari', '');
    },*/
    /* validationInput: check validation of input that is given by user and if input value is valid
    then make text field and ok button disable and make start button enable. */
    validationInput: function () {
        this.changePropertyOfElements();
        // this.clearOutputValues(); //todo if required
    },

    // startExperiment: work to start code execution.
    startExperiment: function () {
        this.replaceElement('startBtnId', 'stopBtnId');
        this.enableElement('stopBtnId');
        this.enableElement('nextBtnId');
        this.disableElement('startBtnId');
        this.applyColorClass('NumApproCodeContent1', 'redClass');
        clearCanvas();
        getwater();
        this.changeClass('startBtnId', 'myStartButton button');
        this.changeClass('stopBtnId', 'myStartButton button');
        this.changeClass('nextBtnId', 'nextButton button');
    },
    // stopExperiment: stop code execution at any point.
    stopExperiment: function () {
        restoreCanvas();
        this.endOfExecution();
    },
    /* plotCurveArea: to draw and show canvas and set the values according step execution,
    and at the end of code execution display final result. */
    plotCanvas: function () {
        this.currentSiblingElement = this.getElementByClass('redClass');
        if (this.currentSiblingElement.id === 'NumApproCodeContent10') {
            restoreCanvas();
            this.endOfExecution();
        }
        this.nextSiblingElement = this.getNextSiblingElement(this.currentSiblingElement);
        if (this.nextSiblingElement.id === 'NumApproCodeContent2') {
            this.executionWithColour();
            getFloatingBody();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent3') {
            this.executionWithColour();
            getFloatingBody();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent4') {
            this.executionWithColour();
            getbodyandmass();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent5') {
            this.executionWithColour();
            canvas_arrow();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent6') {
            this.executionWithColour();
            getmarkingandarr();

        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent7') {
            this.executionWithColour();


        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent8') {
            this.executionWithColour();
            handleInput()
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent9') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent10') {
            this.executionWithColour();
        }
    },

    // init: calls methods to draw canvas and activate events.
    init: function () {
        this.activateEvents();
    }
}
// onload function: call init method on window onload.
window.onload = function () {
    view.init();
}

