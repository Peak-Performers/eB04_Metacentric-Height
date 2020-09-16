//---------------------------------+
// Author: Parvesh Kumar Gahanolia |
// Email: <parvesh@vlabs.ac.in>    |
//---------------------------------+
window.model = {
    valueOfW: 1.5, //user input of weight of floating object.
    valueOfw: 0.3056, //user input of weight of load.
    valueOfY:0, //user input of displacement in load
    valueOfGM: 0 // user input of metacentric Height
}

window.view = {
    currentSiblingElement: new Object(), // Object value of current sibling.
    nextSiblingElement: new Object(), // Object value of next sibling.
    nextOfnextSiblingElement: new Object(), // // Object value of next of next sibling.
    selectedLoop: new Object(), // Object of selected list.
    // addClickEvent: add click EventListener to other methods.
    addClickEvent: function (id, method) {
        var element = document.getElementById(id);
        element.addEventListener('click', method, false);
    },
    // addChangeEvent: add change EventListener to other methods.
    addChangeEvent: function(id, method) {
        var element = document.getElementById(id)
        element.addEventListener('change', method, false);
    },
    // activateEvents: calls addClickEvent method to add EventListener to other methods.
    activateEvents: function() {
        this.addChangeEvent('loopList', function() { view.showExecutionSection() });
        this.addClickEvent('okBtnId', function() { view.validationInput() });
        this.addClickEvent('startBtnId', function() { view.startExecution() });
        this.addClickEvent('stopBtnId', function() { view.stopExecution() });
        this.addClickEvent('nextBtnId', function() { view.plotCanvas() });
    },
    // getSelectedLoopId: returns id of selected option in list.
    getSelectedLoopId: function(id) {
        var listOfLoop = document.getElementById(id);
        var selectedLoop = listOfLoop.options[listOfLoop.selectedIndex];
        return selectedLoop;
    },
    // changeClass: changes class name of a element.
    changeClass: function(id, className) {
        document.getElementById(id).className = className
    },
    // enableElement: makes element enable.
    enableElement: function (id) {
        document.getElementById(id).disabled = false;
    },
    // disableElement: makes element disable.
    disableElement: function (id) {
        document.getElementById(id).disabled = true;
    },
    // replaceElement: replace one element by another element.
    replaceElement: function (id1, id2) {
        document.getElementById(id1).style.display = 'none';
        document.getElementById(id2).style.display = 'block';
    },
    // setValue: set given value to a element.
    setValue: function (id, value) {
        document.getElementById(id).value = value;
    },
    // getValue: get value from element.
    getValue: function (id) {
        var value = document.getElementById(id).value;
        return value;
    },
    // applyColorClass: adds new color class to a element.
    applyColorClass: function (id, colorClass) {
        document.getElementById(id).classList.add(colorClass);
    },
    // removeColorClass: removes color class from element.
    removeColorClass: function (id, colorClass) {
        document.getElementById(id).classList.remove(colorClass);
    },
    // getNextSiblingElement: return next sibling element.
    getNextSiblingElement: function (element) {
        var nextSiblingElement = element.nextSibling;
        nextSiblingElement = nextSiblingElement.nextSibling;
        return nextSiblingElement;
    },
    // getElementByClass: return element by given class name.
    getElementByClass: function (className) {
        var element = document.getElementsByClassName(className);
        return element[0];
    },
    // setInnerHtml: set innerText to a element.
    setInnerHtml: function (id, innerText) {
        document.getElementById(id).innerHTML = innerText;
    },
    // hideCode: hides code content that is not selected in drop down list.
    hideCode: function(loopId) {
        var node = document.getElementById(loopId);
        var allChild = node.childNodes;
        for( i = 1 ; i < allChild.length ; i+=2) {
            this.applyColorClass(allChild[i].id, 'hide');
        }
    },
    // showCode: shows code content that is selected in drop down list.
    showCode: function(loopId) {
        var node = document.getElementById(loopId);
        var allChild = node.childNodes;
        for( i = 1 ; i < allChild.length ; i+=2) {
            this.removeColorClass(allChild[i].id, 'hide');
        }
    },
    // showExecutionSection: calls showCode and hideCode methods when drop down list is selected.
    showExecutionSection: function() {
        this.selectedLoop = this.getSelectedLoopId('loopList')
        var center = document.getElementById('center');
        var fL = document.getElementById('10L');
        var SL = document.getElementById('20L');
        var TL = document.getElementById('30L');
        var foL = document.getElementById('40L');
        var fiL = document.getElementById('50L');
        var siL = document.getElementById('60L');
        var seL = document.getElementById('70L');
        var eL = document.getElementById('80L');
        var fR = document.getElementById('10R');
        var sR = document.getElementById('20R');
        var tR = document.getElementById('30R');
        var foR = document.getElementById('40R');
        var fiR = document.getElementById('50R');
        var siR = document.getElementById('60R');
        var seR = document.getElementById('70R');
        var eR = document.getElementById('80R');

        if (this.selectedLoop.id === 'ifElseList') {
            if (ifElseCodeContent.className === 'hide') {
                this.showCode('ifElseCode');
            }
            if (ifElseIfCodeContent.className !== 'hide') {
                this.hideCode('ifElseIfCode');
            }
        }
        if (this.selectedLoop.id === 'ifElseIfList') {
            if (ifElseIfCodeContent.className === 'hide') {
                this.showCode('ifElseIfCode');
            }
            if (ifElseCodeContent.className !== 'hide') {
                this.hideCode('ifElseCode');
            }
        }
    },
    // changeFlagValue: change flag value to 1 when point is inside of square.
    changeFlagValue: function (id1, id2, value) {
        this.setInnerHtml(id1, value);
        this.codeExecutionWithColourAndId(id2);
    },
    // setFlagText: set flag text in elements during code execution.
    setFlagText: function () {
        this.codeExecutionWithColour();
        this.setInnerHtml('flag1Id', 'flag_1 = ');
        this.setInnerHtml('flag2Id', 'flag_2 = ');
        this.setInnerHtml('flag3Id', 'flag_3 = ');
        this.setInnerHtml('flag4Id', 'flag_4 = ');
    },
    // setFlagText: set flag value in elements during code execution.
    setFlagValue: function () {
        this.codeExecutionWithColour();
        this.setInnerHtml('flagValue1', '0');
        this.setInnerHtml('flagValue2', '0');
        this.setInnerHtml('flagValue3', '0');
        this.setInnerHtml('flagValue4', '0');
    },
    // codeExecutionWithColour: shows execution of code by changing color in code Content.
    codeExecutionWithColour: function () {
        this.removeColorClass(this.currentSiblingElement.id, 'redClass');
        this.applyColorClass(this.nextSiblingElement.id, 'redClass');
    },
    // codeExecutionWithColourAndId: shows execution of code by changing color with given id in code Content.
    codeExecutionWithColourAndId: function (id) {
        this.removeColorClass(this.currentSiblingElement.id, 'redClass');
        this.applyColorClass(id, 'redClass');
    },
    // resetVariables: reset all variables to it's initial state.
    resetVariables: function () {
        model.valueOfW = 1.5;
        model.valueOfw = 0.3056;
        this.currentSiblingElement = '';
        this.nextSiblingElement = '';
    },
    // resetTextFieldValue: reset text field to their initial state.
    resetTextFieldValue: function () {
        this.setValue('textFieldXId', 1.5);
        this.setValue('textFieldYId', 0.3056);
        this.setValue('loopList', '');
    },
    // resetButtonAndTextField: reset button it's initial state and do text field enable.
    resetButtonAndTextField: function () {
        this.enableElement('okBtnId');
        this.disableElement('nextBtnId');
        this.disableElement('stopBtnId');
        this.changeClass('loopList', 'button expList');
        this.changeClass('okBtnId', 'button okButton');
        this.changeClass('stopBtnId', 'buttonDisable stopButton margin15 hide');
        this.changeClass('startBtnId', 'buttonDisable startButton margin15');
        this.changeClass('nextBtnId', 'buttonDisable nextButton margin15');
    },

    // endOfExecution: work at end of code execution and with stop button to reset whole experiment at it's initial state.
    endOfExecution: function () {
        this.resetButtonAndTextField();
        this.resetTextFieldValue();
        this.resetVariables();
        this.enableElement('loopList');
        var idOfRedText = this.getElementByClass('redClass').id;
        this.removeColorClass(idOfRedText, 'redClass');
    },

    /* validationInput: check validation of input that is given by user and if input value is valid
    then make text field and ok button disable and make start button enable. */
    validationInput: function () {
        this.changePropertyOfElements();
        this.setInnerHtml('WInnerText', model.valueOfW);
        this.setInnerHtml('wInnerText', model.valueOfw);
    },
    // changePropertyOfElements: changes property of elemants with enableElement, disableElement and changeClass.
    changePropertyOfElements: function () {
        this.disableElement('loopList');
        this.disableElement('textFieldXId');
        this.disableElement('textFieldYId');
        this.enableElement('startBtnId');
        this.changeClass('startBtnId', 'button startButton margin15');
        this.disableElement('okBtnId');
        this.changeClass('okBtnId', 'buttonDisable okButton');
        this.changeClass('loopList', 'buttonDisable expList');
    },
    // startExperiment: work to start code execution.
    startExecution: function () {
        this.changeClass('startBtnId', 'buttonDisable startButton margin15 hide');
        this.applyColorClass('NumApproCodeContent1', 'redClass');
        this.enableElement("Water");
        this.changeClass("Water","btnDisable info");
        this.changeClass('nextBtnId', 'button nextButton margin15');
        this.changeClass('stopBtnId', 'button stopButton margin15');
        this.enableElement('stopBtnId');
        this.enableElement('nextBtnId');
        this.disableElement('startBtnId');

    },

    stopExecution: function () {
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
            this.changeClass("Ship","btnDisable danger");
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






    // init: calls methods to  activate events.
    init: function () {
        this.activateEvents();

    }
}
// onload function: call init method on window onload.
window.onload = function () {
    window.view.init();
}
