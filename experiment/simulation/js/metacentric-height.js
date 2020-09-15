window.model = {
    inputValueA: '', // user input W.
    inputValueB: '', // user input w.
    inputValueC: '', // user input tan(angle).
    inputValueD:'', // user input displacement
    metacentricHeight: 0 //metacentric Height
}


window.view ={
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

    // setValue: set given value to a element.
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

    // resetVariables: reset all variables to it's initial state.
    resetVariables: function () {
        model.inputValueA = '';
        model.inputValueB = '';
        model.inputValueC = '';
        model.inputValueD = '';
        model.metacentricHeight = 0;
    },
    // resetTextFieldValue: reset text field to their initial state.
    resetTextFieldValue: function () {
        this.setValue('valueA', '');
        this.setValue('valueB', '');
        this.setValue('myRange', '');
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
        this.resetVariables();
        this.resetTextFieldValue();
        this.resetButtonAndTextField();
        var idOfRedText = this.getElementByClass('redClass').id;
        this.removeColorClass(idOfRedText, 'redClass');
    },

    /* validationInput: check validation of input that is given by user and if input value is valid
    then make text field and ok button disable and make start button enable. */
    validationInput: function () {
        var slider = this.getValue("myRange");
        var inputValueD;
        var metacentricHeight;
        inputValueD = slider;
        if(inputValueD==="0"){
             metacentricHeight = 0;
            alert("There is no displacement in load,it is at the centre of the load " + " " +
                " Metacentric Height in mm = 0mm ");
        }
        model.inputValueA=1.5;
        model.inputValueB=0.3056;
        model.metacentricHeight= metacentricHeight;
        this.changePropertyOfElements();
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
            printValue();
            getbodyandmass();
            getmarkingandarr();
        }
        else if (this.nextSiblingElement.id === 'NumApproCodeContent5') {
            this.executionWithColour();
            clearCanvas();
            getwater();
            displacedInLoad();
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

