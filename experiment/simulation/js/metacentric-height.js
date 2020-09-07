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
        var valueD1 = this.getValue('valueD');
        if (valueD1 === 0){
            model.inputValueC = 0;
        }
        else if ( valueD1 === (-10)) {
            model.inputValueC = 0.02618;
        }
        else if (valueD1 === (-20)) {
            model.inputValueC = 0.05240;
        }
        else if (valueD1 === (-30)) {
            model.inputValueC = 0.07870;
        }
        else if (valueD1 === (-40)) {
            model.inputValueC = 0.10514;
        }
        else if (valueD1 === (-50)) {
            model.inputValueC = 0.13165;
        }
        else if (valueD1 === (-60)) {
            model.inputValueC = 0.15838;
        }
        else if (valueD1 === (-70)) {
            model.inputValueC = 0.18533;
        }
        else if (valueD1 === (-80)) {
            model.inputValueC = 0.20345;
        }
        else if (valueD1 === 10) {
            model.inputValueC = 0.02618;
        }
        else if (valueD1 === 20) {
            model.inputValueC = 0.04366;
        }
        else if (valueD1 === 30) {
            model.inputValueC = 0.07870;
        }
        else if (valueD1 === 40) {
            model.inputValueC = 0.09628;
        }
        else if (valueD1 === 50 ) {
            model.inputValueC = 0.13165;
        }
        else if (valueD1 === 60 ) {
            model.inputValueC = 0.14945;
        }
        else if	( valueD1 === 70 ) {
            model.inputValueC = 0.17632;
        }
        else if (valueD1 === 80) {
            model.inputValueC = 0.20345;
        }
        model.inputValueA = 1.5;
        model.inputValueB = 0.3056;
        model.inputValueD = Math.abs(valueD1);
        this.changePropertyOfElements();
        // this.clearOutputValues(); //todo if required
        this.restoreCanvas();
    },
    // restoreCanvas: restore canvas it's initial state after clear previously drawed canvas.
    restoreCanvas: function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height); // to clear previously drawed canvas.
        this.canvasContext.restore(); // restore canvas it's initial state.
        // this.drawCanvas(); // redraw graph on canvas.
    }, //todo change

    // startExperiment: work to start code execution.
    startExperiment: function () {
        this.replaceElement('startBtnId', 'stopBtnId');
        this.enableElement('stopBtnId');
        this.enableElement('nextBtnId');
        this.disableElement('startBtnId');
        this.applyColorClass('NumApproCodeContent1', 'redClass');
        this.changeClass('startBtnId', 'myStartButton button');
        this.changeClass('stopBtnId', 'myStartButton button');
        this.changeClass('nextBtnId', 'nextButton button');
    },
    // stopExperiment: stop code execution at any point.
    stopExperiment: function () {
        this.endOfExecution();
    },
    /* plotCurveArea: to draw and show canvas and set the values according step execution,
    and at the end of code execution display final result. */
    plotCanvas: function () {
        this.currentSiblingElement = this.getElementByClass('redClass');
        if (this.currentSiblingElement.id === 'NumApproCodeContent10') {
            this.endOfExecution();
        }
        this.nextSiblingElement = this.getNextSiblingElement(this.currentSiblingElement);
        if (this.nextSiblingElement.id === 'NumApproCodeContent2') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent3') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent4') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent5') {
            this.executionWithColour();

        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent6') {
            this.executionWithColour();

        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent7') {
            this.executionWithColour();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent8') {
            this.executionWithColour();
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
        // this.drawCanvas();
        this.activateEvents();
    }
}
// onload function: call init method on window onload.
window.onload = function () {
    view.init();
}

